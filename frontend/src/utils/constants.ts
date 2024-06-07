import { createTheme } from '@mui/material/styles';
export const theme = createTheme({
    palette: {
      primary: {
        light: '#ffff',
        main: '#5acccc',
        dark: '#335c6e',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#000',
      },
    },
  });

export interface Book {
    author: string;
    coverPhotoURL: string;
    readingLevel: string;
    title: string;
  }
  
export interface ReadingListState {
    readingList: Book[];
    selectedBook: Book | null;
  }

  export interface BooksState {
    books: Book[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }
  
export interface SearchResultProps {
    book: Book;
    addBookToReadingList: (book: Book) => void;
  }

  export const initialState: BooksState = {
    books: [],
    status: 'idle',
    error: null,
  };
  
