import React from 'react';
import { Grid, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../utils/hooks';
import { removeBookFromReadingList, setSelectedBook } from '../redux/readingListSlice';
import ReadingListItem from './ReadingListItem';
import { Book } from '../utils/constants';

const ReadingList: React.FC = () => {
  const readingList = useAppSelector((state) => state.readingList.readingList);
  const selectedBook = useAppSelector((state) => state.readingList.selectedBook);
  const dispatch = useAppDispatch();

  const handleRemoveBook = (title: string) => {
    dispatch(removeBookFromReadingList(title));
  };

  const handleOpenModal = (book: Book) => {
    dispatch(setSelectedBook(book));
  };

  const handleCloseModal = () => {
    dispatch(setSelectedBook(null));
  };

  return (
    <div>
      <h2>Reading List</h2>
      <Grid container spacing={2}>
        {readingList.map((book) => (
          <ReadingListItem
            key={book.title}
            book={book}
            onRemoveBook={handleRemoveBook}
            onOpenModal={handleOpenModal}
          />
        ))}
      </Grid>

      {selectedBook && (
        <Dialog open={true} onClose={handleCloseModal}>
          <DialogTitle>{selectedBook.title}</DialogTitle>
          <DialogContent>
            <img src={selectedBook.coverPhotoURL} alt={selectedBook.title} style={{ width: '100%' }} />
            <Typography variant="h6">{selectedBook.author}</Typography>
            <Typography variant="body1">Reading Level: {selectedBook.readingLevel}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary">Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default ReadingList;
