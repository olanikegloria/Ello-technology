import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { initialState } from "../utils/constants";

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  const response = await axios.post("http://localhost:4000/", {
    query: `
      query {
        books {
          author
          coverPhotoURL
          readingLevel
          title
        }
      }
    `,
  });
  return response.data.data.books;
});

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export default booksSlice.reducer;
