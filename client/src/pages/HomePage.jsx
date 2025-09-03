import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlogs } from "../redux/blogSlice";
import { Link } from "react-router-dom";

export default function HomePage() {
  const { blogs, loading, error } = useSelector((state) => state.blog);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlogs()); // MongoDB se blogs load karo
  }, [dispatch]);

  if (loading) return <p className="text-center mt-10">⏳ Loading blogs...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">❌ {error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <h2 className="text-3xl font-bold mb-6">📚 Latest Blogs</h2>
      {blogs.length === 0 ? (
        <p>No blogs yet. Create one!</p>
      ) : (
        blogs.map((blog) => (
          <div key={blog._id} className="mb-6 p-4 border rounded shadow bg-white dark:bg-gray-800">
            <h3 className="text-xl font-semibold">{blog.title}</h3>
            <p className="text-gray-700 dark:text-gray-300">
              {blog.content.substring(0, 120)}...
            </p>
            <Link
              to={`/blog/${blog._id}`}
              className="text-blue-600 hover:underline mt-2 inline-block"
            >
              Read more →
            </Link>
          </div>
        ))
      )}
    </div>
  );
}
