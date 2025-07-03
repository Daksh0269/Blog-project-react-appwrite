import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Service from '../appwrite/config';

// Fetch all public posts once
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (_, thunkAPI) => {
    try {
      const response = await Service.getPosts();
      console.log('🔥 fetchPosts response:', response); // 👈 LOG HERE
      return response?.documents || []; // always return an array
    } catch (error) {
      console.error('❌ fetchPosts error:', error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearPosts: (state) => {
      state.posts = [];
    },
    addPost: (state, action) => {
      state.posts.unshift(action.payload); // add new post at top
    },
    updatePost: (state, action) => {
      const index = state.posts.findIndex(p => p.$id === action.payload.$id);
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter(p => p.$id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearPosts, addPost, updatePost, deletePost } = postSlice.actions;
export default postSlice.reducer;
