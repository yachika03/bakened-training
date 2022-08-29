const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const mw=require("../middleware/auth.js")
router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/users", userController.createUser)

router.post("/login", userController.loginUser)

//The userId is sent by front end
router.get("/users/:userId", userController.getUserData)


router.put("/users/:userId", userController.updateUser)
router.delete('/users/:userId', userController.deleteUser)
// middleware
router.get("/users/:userId",mw.authenticate,mw.authorise, userController.getUserData1)
router.put("/users/:userId",mw.authenticate,mw.authorise, userController.updateUser1)
router.delete('/users/:userId',mw.authenticate,mw.authorise, userController.deleteUser1)

module.exports = router;