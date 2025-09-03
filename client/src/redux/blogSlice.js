import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as blogApi from "../api/blogApi"; // yaha se axios calls aayengi

// ✅ Fetch all blogs
export const fetchBlogs = createAsyncThunk("blog/fetchBlogs", async () => {
  const res = await blogApi.getBlogs();
  return res.data;
});

// ✅ Create new blog
export const createBlog = createAsyncThunk("blog/createBlog", async (blog) => {
  const res = await blogApi.createBlog(blog);
  return res.data;
});

// ✅ Update blog
export const updateBlog = createAsyncThunk("blog/updateBlog", async ({ id, data }) => {
  const res = await blogApi.updateBlog(id, data);
  return res.data;
});

// ✅ Delete blog
export const deleteBlog = createAsyncThunk("blog/deleteBlog", async (id) => {
  await blogApi.deleteBlog(id);
  return id;
});

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // create
      .addCase(createBlog.fulfilled, (state, action) => {
        state.blogs.unshift(action.payload); // latest blog top pe
      })

      // update
      .addCase(updateBlog.fulfilled, (state, action) => {
        const index = state.blogs.findIndex((b) => b._id === action.payload._id);
        if (index !== -1) state.blogs[index] = action.payload;
      })

      // delete
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter((b) => b._id !== action.payload);
      });
  },
});

export default blogSlice.reducer;
