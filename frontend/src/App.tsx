import { useEffect } from 'react';
import { ThemeProvider, Container, Typography, CssBaseline } from '@mui/material';
import { theme } from './utils/constants'
import BookSearch from './components/BookSearch';
import ReadingList from './components/ReadingList';
import { useAppDispatch, useAppSelector } from './utils/hooks';
import { fetchBooks } from './redux/booksSlice';
function App() {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.books.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBooks());
    }
  }, [status, dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Typography variant="h4" align="center" gutterBottom>
          Ello Book Assignment
        </Typography>
        <BookSearch />
        <ReadingList />
      </Container>
    </ThemeProvider>
  );
}

export default App;

