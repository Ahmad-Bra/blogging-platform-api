import express from "express";
import { BlogControler } from "../controlers/blog";

const router = express.Router();
const { getBlogByID, getBlogs, updateBlog, postBlog, deleteBlog } =
  new BlogControler();
router.get("/blogs", getBlogs);

router.get("/blogs/:id", getBlogByID);

router.put("/blogs/:id", updateBlog);

router.post("/blogs", postBlog);

router.delete("/blogs/:id", deleteBlog);

export default router;
