import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export default function BlogDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // blogs state se current blog dhoondo
  const blogs = useSelector((state) => state.blog.blogs);
  const blog = blogs.find((b) => b.id === Number(id));

  if (!blog) {
    return <p className="p-6 text-center">❌ Blog not found</p>;
  }

  // delete handler
  const handleDelete = () => {
    dispatch({ type: "blog/deleteBlog", payload: blog.id });
    navigate("/");
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">{blog.content}</p>

      <div className="flex gap-4">
        <Link
          to={`/edit/${blog.id}`}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
        >
          ✏️ Edit
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}
