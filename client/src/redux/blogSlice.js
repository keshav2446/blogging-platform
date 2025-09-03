import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogs: [], // {id, title, content}
  },
  reducers: {
    addBlog: (state, action) => {
      state.blogs.push(action.payload);
    },
    updateBlog: (state, action) => {
      const updatedBlog = action.payload;
      const index = state.blogs.findIndex((b) => b.id === updatedBlog.id);
      if (index !== -1) {
        state.blogs[index] = updatedBlog;
      }
    },
    deleteBlog: (state, action) => {
      const id = action.payload;
      state.blogs = state.blogs.filter((b) => b.id !== id);
    },
  },
});

export const { addBlog, updateBlog, deleteBlog } = blogSlice.actions;
export default blogSlice.reducer;
