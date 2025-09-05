import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import API from "../utils/api";
import { useSelector } from "react-redux";

export default function BlogDetailsPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await API.get(`/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error("Error fetching blog:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await API.delete(`/blogs/${id}`);
      alert("✅ Blog deleted");
      navigate("/");
    } catch (err) {
      console.error("Error deleting blog:", err);
      alert("❌ Failed to delete blog");
    }
  };

  if (loading) {
    return <p className="text-center p-6">⏳ Loading blog...</p>;
  }

  if (!blog) {
    return <p className="text-center p-6">❌ Blog not found</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-20 px-4">
      <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        {blog.title}
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        ✍️ {blog.author?.name || "Anonymous"} •{" "}
        {new Date(blog.createdAt).toLocaleDateString()}
      </p>
      <div className="prose dark:prose-invert max-w-none">
        <p>{blog.content}</p>
      </div>

      {/* Edit/Delete only if logged-in user is author */}
      {user && blog.author && user._id === blog.author._id && (
        <div className="mt-6 flex gap-4">
          <Link
            to={`/edit/${blog._id}`}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
          >
            ✏️ Edit
          </Link>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
          >
            🗑️ Delete
          </button>
        </div>
      )}
    </div>
  );
}
