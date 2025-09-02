import { Router } from "express";

const router = Router();

// Test route
router.get("/", (req, res) => {
  res.json({ message: "Auth route working 🚀" });
});

export default router;
