import React from 'react';
import { List, ListItem, ListItemText, Button, Paper, ListItemAvatar, Avatar } from '@mui/material';
import { Book } from '../types/Book';

interface SearchListProps {
  books: Book[];
  addToReadingList: (book: Book) => void;
}

const SearchList: React.FC<SearchListProps> = ({ books, addToReadingList }) => {

  return (
    <Paper 
      sx={{ 
        maxHeight: '400px',
        overflowY: 'auto',
        position: 'absolute',
        top: 0,
        width: '96%',
        zIndex: 4,
        marginTop: '73px',
        boxShadow: 3,
      }}>
      <List>
        {books.length === 0 ? (
          <ListItem>
            <ListItemText primary="No books found" />
          </ListItem>
        ) : (
          books.map((book, index) => (
            <ListItem key={index} divider>
              <ListItemAvatar>
                <Avatar alt={book.title} src={require(`../${book.coverPhotoURL}`)} />
              </ListItemAvatar>
              <ListItemText
                primary={book.title}
                secondary={`by ${book.author}`}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => addToReadingList(book)}
              >
                Add
              </Button>
            </ListItem>
          ))
        )}
      </List>
    </Paper>
  );
};

export default SearchList;