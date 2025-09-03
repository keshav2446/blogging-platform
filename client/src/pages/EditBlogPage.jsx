import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { updateBlog } from "../redux/blogSlice";

export default function EditBlogPage() {
  const { id } = useParams();
  const { blogs } = useSelector((state) => state.blog);
  const blog = blogs.find((b) => b._id === id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setContent(blog.content);
    }
  }, [blog]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!blog) return;

    await dispatch(updateBlog({ id, data: { title, content, author: blog.author } }));
    navigate(`/blog/${id}`);
  };

  if (!blog) {
    return <p className="p-6 text-center">❌ Blog not found</p>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">✏️ Edit Blog</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <textarea
          placeholder="Update your blog content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full mb-4 p-2 border rounded h-40"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
