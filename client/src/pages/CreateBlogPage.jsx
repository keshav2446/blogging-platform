import { useDispatch, useSelector } from "react-redux";
import { addBlog } from "../redux/blogSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateBlogPage() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login to create a blog!");
      return;
    }

    const newBlog = {
      id: Date.now(),
      title,
      content,
      author: user.name,
    };

    dispatch(addBlog(newBlog));
    navigate("/");
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">✍️ Create New Blog</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
          required
        />
        <textarea
          placeholder="Write your blog content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full mb-4 p-2 border rounded h-40"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Publish
        </button>
      </form>
    </div>
  );
}
