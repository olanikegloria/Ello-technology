import React from 'react';
import { ListItem, ListItemText, ListItemAvatar, Avatar, Button } from '@mui/material';
import { SearchResultProps } from '../utils/constants';

const SearchResult: React.FC<SearchResultProps> = ({ book, addBookToReadingList }) => {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar src={book.coverPhotoURL} variant="square" style={{ width: '60px', height: '60px' }} />
      </ListItemAvatar>
      <ListItemText primary={book.title} secondary={book.author} />
      <Button variant="contained" color="primary" onClick={() => addBookToReadingList(book)}>
        Add to Reading List
      </Button>
    </ListItem>
  );
};

export default SearchResult;


