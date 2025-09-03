import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteBlog } from "../redux/blogSlice";

export default function BlogDetailsPage() {
  const { id } = useParams();
  const blogs = useSelector((state) => state.blog.blogs);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const blog = blogs.find((b) => b.id === Number(id));

  if (!blog) {
    return <p className="p-6 text-center">❌ Blog not found</p>;
  }

  const handleDelete = () => {
    dispatch(deleteBlog(blog.id));
    navigate("/");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        By <span className="font-semibold">{blog.author}</span>
      </p>
      <p className="text-lg mb-6">{blog.content}</p>

      <div className="flex space-x-4">
        <Link
          to="/"
          className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded"
        >
          ← Back
        </Link>

        {user?.name === blog.author && (
          <>
            <button
              onClick={() => navigate(`/blog/${blog.id}/edit`)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
            >
              Edit Blog
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Delete Blog
            </button>
          </>
        )}
      </div>
    </div>
  );
}
