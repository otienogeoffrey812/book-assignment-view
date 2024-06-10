import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, Grid, IconButton, Tooltip } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Favorite as FavoriteIcon, FavoriteBorder as FavoriteBorderIcon } from '@mui/icons-material';

interface Book {
  author: string;
  coverPhotoURL: string;
  readingLevel: string;
  title: string;
}

interface ReadingListProps {
  readingList: Book[];
  removeFromReadingList: (title: string) => void;
}

const ReadingList: React.FC<ReadingListProps> = ({ readingList, removeFromReadingList }) => {
  const [items, setItems] = useState<Book[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    setItems(readingList.slice(0, 10));
    setHasMore(readingList.length > 10);
  }, [readingList]);

  const fetchMoreData = () => {
    if (items.length >= readingList.length) {
      setHasMore(false);
      return;
    }
    const newItems = readingList.slice(items.length, items.length + 10);
    setItems(prevItems => [...prevItems, ...newItems]);
  };

  const handleIconClick = (title: string) => {
    setSelected(prev => (prev === title ? null : title));
    removeFromReadingList(title);
  };

  return (
    <Box sx={{ marginTop: '10px' }}>
      <Typography variant="h6" color="text.primary">Teacher's Reading List</Typography>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<Box textAlign="center">Loading...</Box>}
        endMessage={
          <Box textAlign="center" sx={{ margin: '10px'}} >
            <Typography variant="subtitle1" color="primary">No More Books To Display</Typography>
          </Box>
        }
        scrollableTarget="scrollableDiv"
        style={{ marginTop: '10px' }}
      >
        <Grid container spacing={2}>
          {items.map((book, index) => (
            <Grid item xs={12} lg={3} key={index}>
              <Card sx={{ margin: '10px 5px', boxShadow: 3, position: 'relative' }} onClick={() => handleIconClick(book.title)}>
                <Tooltip title={selected === book.title ? "Remove from reading list" : "Add to reading list"} arrow>
                  <IconButton
                    sx={{ 
                      position: 'absolute', 
                      top: 0, 
                      right: 0, 
                      color: '#5ACCCC', 
                      zIndex: 1,
                    }}
                    onClick={() => removeFromReadingList(book.title)}
                  >
                    {selected === book.title ? (
                      <FavoriteIcon sx={{ fontSize: '2rem' }} />
                    ) : (
                      <FavoriteBorderIcon sx={{ fontSize: '2rem', color: '#5ACCCC' }} />
                    )}
                  </IconButton>
                </Tooltip>
                <img src={require(`../${book.coverPhotoURL}`)} alt={book.title} style={{ width: '100%' }} />
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.87)' }}>
                    {book.title}
                  </Typography>
                  <Typography variant="body1" color="textSecondary" gutterBottom>
                    by {book.author}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </Box>
  );
};

export default ReadingList;