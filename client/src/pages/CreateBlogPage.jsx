import { useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function CreateBlogPage() {
  const [form, setForm] = useState({ title: "", content: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/blogs", form); // send to backend
      alert("✅ Blog created successfully!");
      navigate("/myblogs"); // redirect to My Blogs
    } catch (err) {
      setError(err.response?.data?.message || "Error creating blog");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-2xl"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          ✍️ Create Blog
        </h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}

        <input
          type="text"
          name="title"
          placeholder="Blog Title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded dark:bg-gray-700 dark:text-white"
          required
        />

        <textarea
          name="content"
          placeholder="Write your blog content here..."
          value={form.content}
          onChange={handleChange}
          className="w-full p-2 mb-3 border rounded h-40 dark:bg-gray-700 dark:text-white"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
        >
          Create
        </button>
      </form>
    </div>
  );
}
