const express = require('express');
const router = express.Router();
const UserModel= require("../models/userModel")
const UserController= require("../controllers/userController");

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createUser", UserController.createUser  )

router.get("/getUsersData", UserController.getUsersData)

router.post("/createbooks", UserController.createbooks)

router.get("/getbooksdata", UserController.getbooksdata)

module.exports = router;