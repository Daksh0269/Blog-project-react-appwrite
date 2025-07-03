import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Service from '../appwrite/config'; // Make sure path is correct

// Async Thunks
export const fetchSavedPosts = createAsyncThunk(
  'saved/fetch',
  async (userId, thunkAPI) => {
    try {
      const res = await Service.getSavedPosts(userId);
      return res?.documents || [];
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addSavedPost = createAsyncThunk(
  'saved/add',
  async ({ userId, postId }, thunkAPI) => {
    try {
      const res = await Service.savePost(userId, postId);
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteSavedPost = createAsyncThunk(
  'saved/delete',
  async (documentId, thunkAPI) => {
    try {
      await Service.deleteSavedPost(documentId);
      return documentId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Initial State
const initialState = {
  saved: [],
  loading: false,
  error: null
};

// Slice
const savedSlice = createSlice({
  name: 'saved',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchSavedPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSavedPosts.fulfilled, (state, action) => {
        state.saved = action.payload;
        state.loading = false;
      })
      .addCase(fetchSavedPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add
      .addCase(addSavedPost.fulfilled, (state, action) => {
        state.saved.push(action.payload);
      })
      .addCase(addSavedPost.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteSavedPost.fulfilled, (state, action) => {
        state.saved = state.saved.filter((item) => item.$id !== action.payload);
      })
      .addCase(deleteSavedPost.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default savedSlice.reducer;
