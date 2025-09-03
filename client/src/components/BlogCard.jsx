import { Link } from "react-router-dom";

export default function BlogCard({ blog }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition">
      <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-2">
        {blog.content.slice(0, 100)}...
      </p>
      <p className="text-sm text-gray-400">By {blog.author}</p>
      <Link
        to={`/blog/${blog.id}`}
        className="text-blue-600 hover:underline mt-2 inline-block"
      >
        Read More →
      </Link>
    </div>
  );
}
