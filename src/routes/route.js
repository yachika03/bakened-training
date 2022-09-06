const express = require('express');
const router = express.Router();

const authorController= require("../controller/authorController.js")
const blogController=require("../controller/blogController.js")


router.post("/authors",authorController.createAuthor)
router.post("/blog",blogController.createBlog)
router.get("/getAllBlog",blogController.getAllBlog)
router.put("/blogs/:blogId",blogController.getBlog)
router.delete("/blogs/:blogId",blogController.deleteBlog)
router.delete("/blogs",blogController.deleteBlogs)


module.exports = router;