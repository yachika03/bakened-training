const express = require('express');
const router = express.Router();
// const UserModel= require("../models/userModel.js")
const UserController= require("../controllers/userController")

const commonMW = require ("../middlewares/commonMiddlewares")


router.post("/createUser", UserController.createUser  )
router.post("/loginUser", UserController.loginUser  )
router.get("/Users/:userId",UserController.getUserData)
router.put("/Users/:userId",UserController.updateUser)
router.delete("/Users/:userId",UserController.deleteUser)
router.get("/Users/:userId",commonMW.mid1,UserController.getUserData1)
router.put("/Users/:userId",commonMW.mid1,UserController.updateUser1)
router.delete("/Users/:userId",commonMW.mid1,UserController.deleteUser1)


module.exports = router;