import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteBlog } from "../redux/blogSlice";

export default function BlogDetailsPage() {
  const { id } = useParams();
  const { blogs } = useSelector((state) => state.blog);
  const blog = blogs.find((b) => b._id === id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!blog) return <p className="p-6 text-center">❌ Blog not found</p>;

  const handleDelete = async () => {
    await dispatch(deleteBlog(id));
    navigate("/");
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded shadow">
      <h2 className="text-3xl font-bold mb-2">{blog.title}</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        ✍️ By {blog.author} • {new Date(blog.createdAt).toLocaleString()}
      </p>
      <p className="mb-6">{blog.content}</p>

      <div className="flex gap-4">
        <Link
          to={`/edit/${blog._id}`}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Edit ✏️
        </Link>
        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Delete 🗑
        </button>
      </div>
    </div>
  );
}
