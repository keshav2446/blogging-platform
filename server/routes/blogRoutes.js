import express from "express";
import Blog from "../models/Blog.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create blog
router.post("/", authMiddleware, async (req, res) => {
  try {
    const newBlog = new Blog({
      title: req.body.title,
      content: req.body.content,
      author: req.user.id, // user ka id from token
    });
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (err) {
    res.status(500).json({ message: "Error creating blog", error: err });
  }
});

// Get all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "name email") // show author info
      .sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching blogs" });
  }
});

// Get my blogs
router.get("/my", authMiddleware, async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user's blogs" });
  }
});

// Get single blog
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "author",
      "name email"
    );
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: "Error fetching blog" });
  }
});

// Update blog
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // only author can update
    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    blog.title = req.body.title || blog.title;
    blog.content = req.body.content || blog.content;

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } catch (err) {
    res.status(500).json({ message: "Error updating blog" });
  }
});

// Delete blog
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // only author can delete
    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await blog.deleteOne();
    res.json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting blog" });
  }
});

export default router;
