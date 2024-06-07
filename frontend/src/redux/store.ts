import { configureStore } from '@reduxjs/toolkit';
import booksReducer from './booksSlice';
import readingListReducer from './readingListSlice';
import searchReducer from './searchSlice';

export const store = configureStore({
  reducer: {
    books: booksReducer,
    readingList: readingListReducer,
    search: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

