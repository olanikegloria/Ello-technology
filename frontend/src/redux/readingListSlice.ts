import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book, ReadingListState } from "../utils/constants";

const initialState: ReadingListState = {
  readingList: [],
  selectedBook: null,
};

const readingListSlice = createSlice({
  name: "readingList",
  initialState,
  reducers: {
    addBookToReadingList: (state, action: PayloadAction<Book>) => {
      const bookExists = state.readingList.some(
        (book) => book.title === action.payload.title
      );
      if (!bookExists) {
        state.readingList.push(action.payload);
      } else {
        console.warn(
          `Book "${action.payload.title}" is already in the reading list.`
        );
      }
    },
    removeBookFromReadingList: (state, action: PayloadAction<string>) => {
      state.readingList = state.readingList.filter(
        (book) => book.title !== action.payload
      );
    },
    setSelectedBook: (state, action: PayloadAction<Book | null>) => {
      state.selectedBook = action.payload;
    },
  },
});

export const {
  addBookToReadingList,
  removeBookFromReadingList,
  setSelectedBook,
} = readingListSlice.actions;
export default readingListSlice.reducer;
