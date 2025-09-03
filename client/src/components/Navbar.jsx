import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { Link } from "react-router-dom";

export default function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-gray-800 text-white p-4 fixed w-full top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold">
          Blogify
        </Link>

        {/* Links */}
        <div className="space-x-6 flex items-center">
          <Link to="/" className="hover:text-gray-300">Home</Link>

          {!user ? (
            <>
              <Link to="/login" className="hover:text-gray-300">Login</Link>
              <Link to="/register" className="hover:text-gray-300">Register</Link>
            </>
          ) : (
            <>
              <span className="text-sm">👋 Hi, {user.name || "User"}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
