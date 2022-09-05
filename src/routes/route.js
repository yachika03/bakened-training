const express = require('express');
const router = express.Router();

const authorController= require("../controller/authorController.js")
const blogModel=require("../controller/blogController.js")
router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})




module.exports = router;