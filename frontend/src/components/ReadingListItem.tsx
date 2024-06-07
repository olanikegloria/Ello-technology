import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Button } from '@mui/material';
import { Book } from '../utils/constants';

interface ReadingListItemProps {
  book: Book;
  onRemoveBook: (title: string) => void;
  onOpenModal: (book: Book) => void;
}

const ReadingListItem: React.FC<ReadingListItemProps> = ({ book, onRemoveBook, onOpenModal }) => {
  const handleRemoveClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    onRemoveBook(book.title);
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card onClick={() => onOpenModal(book)}>
        <CardMedia
          component="img"
          height="200"
          image={book.coverPhotoURL}
          alt={book.title}
          style={{ objectFit: 'cover' }}
        />
        <CardContent>
          <Typography variant="h6">{book.title}</Typography>
          <Typography variant="body2" color="textSecondary">{book.author}</Typography>
        </CardContent>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'auto', marginBottom: '8px' }}>
          <Button variant="contained" color="secondary" onClick={handleRemoveClick}>
            Remove
          </Button>
        </div>
      </Card>
    </Grid>
  );
};

export default ReadingListItem;
