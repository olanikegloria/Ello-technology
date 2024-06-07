import React from 'react';
import { ListItem, ListItemText, Button } from '@mui/material';

interface Book {
  author: string;
  coverPhotoURL: string;
  readingLevel: string;
  title: string;
}

interface SearchResultProps {
  book: Book;
  addBookToReadingList: (book: Book) => void;
}

const SearchResult: React.FC<SearchResultProps> = ({ book, addBookToReadingList }) => (
  <ListItem>
    <ListItemText primary={book.title} secondary={book.author} />
    <Button variant="contained" color="primary" onClick={() => addBookToReadingList(book)}>
      Add to Reading List
    </Button>
  </ListItem>
);

export default SearchResult;
