import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../utils/api";
import { useSelector } from "react-redux";

export default function BlogDetailsPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchBlog = async () => {
      const res = await API.get(`/blogs/${id}`);
      setBlog(res.data);
    };
    const fetchComments = async () => {
      const res = await API.get(`/comments/${id}`);
      setComments(res.data);
    };
    fetchBlog();
    fetchComments();
  }, [id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await API.post(`/comments/${id}`, { content: newComment });
      setComments([res.data, ...comments]);
      setNewComment("");
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-20 px-4">
      {blog && (
        <>
          <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            ✍️ {blog.author?.name || "Anonymous"}
          </p>
          <p className="mb-8">{blog.content}</p>
        </>
      )}

      {/* Comments Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">💬 Comments</h2>

        {user ? (
          <form onSubmit={handleAddComment} className="mb-6 flex gap-2">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 p-2 border rounded dark:bg-gray-700 dark:text-white"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Post
            </button>
          </form>
        ) : (
          <p className="mb-4 text-gray-500">⚠️ Login to post a comment.</p>
        )}

        {comments.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">No comments yet.</p>
        ) : (
          <ul className="space-y-4">
            {comments.map((c) => (
              <li
                key={c._id}
                className="p-4 border rounded bg-white dark:bg-gray-800"
              >
                <p className="text-gray-900 dark:text-gray-100">{c.content}</p>
                <span className="text-sm text-gray-500">
                  by {c.author?.name || "User"} •{" "}
                  {new Date(c.createdAt).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
