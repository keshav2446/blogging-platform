import { useSelector } from "react-redux";
import BlogCard from "../components/BlogCard";
import { Link } from "react-router-dom";

export default function HomePage() {
  const blogs = useSelector((state) => state.blog.blogs);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">📰 Latest Blogs</h1>
        <Link
          to="/create"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          + Create Blog
        </Link>
      </div>

      {blogs.length === 0 ? (
        <p className="text-gray-500">No blogs yet. Be the first to create one!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
}
