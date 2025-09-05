import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreateBlogPage from "./pages/CreateBlogPage";   // ✅ missing import added
import BlogDetailsPage from "./pages/BlogDetailsPage"; // ✅ missing import added
import EditBlogPage from "./pages/EditBlogPage";
import MyBlogsPage from "./pages/MyBlogsPage";


function App() {
  return (
    <>
      <Navbar />
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create" element={<CreateBlogPage />} />
          <Route path="/blog/:id" element={<BlogDetailsPage />} />
          <Route path="/blog/:id/edit" element={<EditBlogPage />} />
          <Route path="/edit/:id" element={<EditBlogPage />} />
          <Route path="/myblogs" element={<MyBlogsPage />} />

        </Routes>
      </div>
    </>
  );
}

export default App;
