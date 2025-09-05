import { useEffect, useState } from "react";
import API from "../utils/api";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function MyBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const res = await API.get("/blogs/my"); // backend route
        setBlogs(res.data);
      } catch (err) {
        console.error("Error fetching my blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchMyBlogs();
    } else {
      setLoading(false);
    }
  }, [user]);

  if (!user) {
    return (
      <p className="text-center p-6 text-gray-700 dark:text-gray-300">
        ⚠️ Please login to view your blogs.
      </p>
    );
  }

  if (loading) {
    return <p className="text-center p-6">⏳ Loading your blogs...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-20 px-4">
      <h2 className="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400">
        📝 My Blogs
      </h2>

      {blogs.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">
          You haven’t written any blogs yet.{" "}
          <Link to="/create" className="text-blue-600 dark:text-blue-400 underline">
            Create one now!
          </Link>
        </p>
      ) : (
        <div className="space-y-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="p-6 border rounded-lg shadow-md bg-white dark:bg-gray-800"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {blog.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mt-2">
                {blog.content.length > 120
                  ? blog.content.substring(0, 120) + "..."
                  : blog.content}
              </p>
              <div className="mt-3 flex justify-between items-center">
                <Link
                  to={`/blog/${blog._id}`}
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Read More →
                </Link>
                <span className="text-sm text-gray-500">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
