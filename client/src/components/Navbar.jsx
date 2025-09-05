import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import { Moon, Sun, Bell, Menu, X } from "lucide-react";

export default function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const dropdownRef = useRef(null);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dark mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setDropdownOpen(false);
  };

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all ${
        scrolled
          ? "bg-white/90 dark:bg-gray-900/90 shadow-md backdrop-blur"
          : "bg-white dark:bg-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 dark:text-blue-400"
        >
          Blogify
        </Link>

        {/* Search bar (desktop) */}
        <div className="hidden md:flex flex-1 mx-6">
          <input
            type="text"
            placeholder="Search blogs..."
            className="w-full px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none"
          />
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4">
          {/* Dark mode toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Notification bell */}
          {user && (
            <button className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          )}

          {/* Links - Desktop */}
          <div className="hidden md:flex items-center gap-4 text-gray-800 dark:text-gray-100">
            <Link to="/" className="hover:text-blue-500">
              Home
            </Link>

            {user ? (
              <>
                <Link to="/create" className="hover:text-blue-500">
                  Create Blog
                </Link>
                <Link to={`/user/${user.id}`} className="hover:text-blue-500">
                  My Blogs
                </Link>

                {/* Avatar dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    className="flex items-center space-x-2"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <img
                      src={`https://ui-avatars.com/api/?name=${user.name}`}
                      alt="avatar"
                      className="w-8 h-8 rounded-full"
                    />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-500">
                  Login
                </Link>
                <Link to="/register" className="hover:text-blue-500">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Hamburger (mobile) */}
          <button
            className="md:hidden p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 px-4 py-3 space-y-2 shadow-lg text-gray-800 dark:text-gray-100">
          <Link to="/" className="block" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          {user ? (
            <>
              <Link
                to="/create"
                className="block"
                onClick={() => setMenuOpen(false)}
              >
                Create Blog
              </Link>
              <Link
                to={`/user/${user.id}`}
                className="block"
                onClick={() => setMenuOpen(false)}
              >
                My Blogs
              </Link>
              <Link
                to="/profile"
                className="block"
                onClick={() => setMenuOpen(false)}
              >
                Profile
              </Link>
              <Link
                to="/settings"
                className="block"
                onClick={() => setMenuOpen(false)}
              >
                Settings
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="block w-full text-left"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
