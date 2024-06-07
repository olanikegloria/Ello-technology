import React, { ChangeEvent, useState } from 'react';
import { TextField, List, Paper, Snackbar, Alert } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../utils/hooks';
import SearchResult from './SearchResult';
import { addBookToReadingList } from '../redux/readingListSlice';
import { setSearchTerm } from '../redux/searchSlice';

const BookSearch: React.FC = () => {
  const [notification, setNotification] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({
    open: false,
    message: '',
    severity: 'success',
  });
  const searchTerm = useAppSelector((state) => state.search.searchTerm);
  const books = useAppSelector((state) => state.books.books);
  const readingList = useAppSelector((state) => state.readingList.readingList);
  const dispatch = useAppDispatch();

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => dispatch(setSearchTerm(event.target.value));

  const handleAddBook = (book: { author: string; coverPhotoURL: string; readingLevel: string; title: string }) => {
    const bookExists = readingList.some((item) => item.title === book.title);
    const message = bookExists ? 'This book is already in the reading list!' : 'Book added to the reading list!';
    setNotification({ open: true, message, severity: bookExists ? 'error' : 'success' });
    if (!bookExists) dispatch(addBookToReadingList(book));
  };

  const generateUniqueKey = (title: string) => `${title}-${Math.random().toString(36).substr(2, 9)}-${Date.now()}`;

  const handleCloseNotification = () => setNotification({ ...notification, open: false });

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <TextField
        label="Search Books"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: '16px' }}
      />
      {searchTerm && (
        <Paper style={{ maxHeight: '400px', overflow: 'auto' }}>
          <List>
            {filteredBooks.map((book) => (
              <SearchResult key={generateUniqueKey(book.title)} book={book} addBookToReadingList={handleAddBook} />
            ))}
          </List>
        </Paper>
      )}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseNotification} severity={notification.severity} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
      {searchTerm && filteredBooks.length === 0 && (
        <Snackbar
          open={true}
          autoHideDuration={6000}
          onClose={handleCloseNotification}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert onClose={handleCloseNotification} severity="error" sx={{ width: '100%' }}>
            No matching books found!
          </Alert>
        </Snackbar>
      )}
    </div>
  );
};

export default BookSearch;
