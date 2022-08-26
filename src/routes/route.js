const express = require('express');
const router = express.Router();
// const UserModel= require("../models/userModel.js")
const UserController= require("../controllers/userController")
const productController= require("../controllers/productController")
const commonMW = require ("../middlewares/commonMiddlewares")
const orderController= require("../controllers/orderController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createproduct", productController.createproduct )
router.post("/createUser",commonMW.mid1, UserController.createUser)

router.post("/createOrder",commonMW.mid2,orderController.createOrder)




module.exports = router;