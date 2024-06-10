import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, Grid, IconButton, Tooltip } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Favorite as FavoriteIcon, FavoriteBorder as FavoriteBorderIcon } from '@mui/icons-material';
import { Book } from '../types/Book';
import { getPersistedReadingList } from '../utils/Functions';

interface ReadingListProps {
  readingList: Book[];
  selectedCategory: string | null;
  readingLevels: string[];
  removeFromReadingList: (title: string) => void;
}

const ReadingList: React.FC<ReadingListProps> = ({ readingList, removeFromReadingList, readingLevels, selectedCategory }) => {
  const [items, setItems] = useState<Book[]>([]);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const[isSelected, setIsSelected] = useState<boolean>(true);

  useEffect(() => {
    const categoryIndex = readingLevels.indexOf(selectedCategory ? selectedCategory : '');
    const category = selectedCategory && categoryIndex > 0 ? selectedCategory: '';
    const persistedReadingList = getPersistedReadingList(category);

    setItems(persistedReadingList.slice(0, 10));
    setHasMore(persistedReadingList.length > 10);
    setPage(0);
  }, [readingList, selectedCategory, readingLevels]);

  const fetchMoreData = () => {
    const persistedReadingList = getPersistedReadingList('');

    const nextPage = page + 1;
    const newItems = persistedReadingList.slice(nextPage * 10, nextPage * 10 + 10);
    setItems(prevItems => [...prevItems, ...newItems]);
    setPage(nextPage);
    setHasMore(newItems.length === 10);
  };

  return (
    <Box sx={{ marginTop: '10px' }}>
      <Typography variant="h6" color="text.primary">Student Reading List</Typography>
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
              <Card sx={{ margin: '10px 5px', boxShadow: 3, position: 'relative' }}>
                <Tooltip title={isSelected ? 'Remove from reading list' : 'Add to reading list'} arrow>
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
                    {isSelected ? (
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