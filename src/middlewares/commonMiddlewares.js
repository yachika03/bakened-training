const jwt = require("jsonwebtoken");
const { findById } = require("../models/userModel");
const mid1 = function (req, res, next) {
  try {

    let token = req.headers["x-auth-token"]
    if (!token)
      res.status(401).send({ msg: "token is must" })
    let validToken = jwt.verify(token, "just-bear-with-it")
    if (!validToken)
      res.status(401).send({ msg: "token is invalid" })
    req.dataId = req.params.userId
    let loginUser = validToken.userId
    if (loginUser != req.dataId)
     return res.status(403).send({ msg: "not authorized" })
     next()
  } catch (error) {
    res.status(500).send(error.message)

  }
}



module.exports.mid1 = mid1
