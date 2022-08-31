const jwt = require("jsonwebtoken");
const { findById } = require("../models/userModel");
const userModel = require("../models/userModel");


const createUser = async function (req, res) {
  try {
    let data = req.body
    if (Object.keys(data).length != 0 && data.emailId && data.password) {

      let saveData = await userModel.create(data)
      res.status(201).send({ status: true, msg: saveData })
    } else res.status(400).send({ msg: "invalid request" })
  } catch (error) {

    res.status(500).send(error.message)

  }
};

const loginUser = async function (req, res) {
  try {
    let data = req.body
    if (Object.keys(data) != 0 && data.emailId && data.password) {
      let userId = req.body.emailId
      let password = req.body.password
      let dataBase = await userModel.findOne({ emailId: userId, password: password })
      if (Object.keys(dataBase).length != 0) {
        let token = jwt.sign({ userId: dataBase._id.toString() }, "just-bear-with-it")
        res.status(201).send({ msg: token })

      } else {
        res.status(404).send({ msg: "not found" })
      }
    } else {
      res.status(400).send({ msg: "invalid request" })
    }
  } catch (error) {
    res.status(500).send(error.message)
  }
}

const getUserData = async function (req, res) {
  try {
    let token = req.headers["x-auth-token"]
    if (!token)
      res.status(401).send({ msg: "token is must" })
    let validToken = jwt.verify(token, "just-bear-with-it")
    if (!validToken)
      res.status(401).send({ msg: "token is invalid" })
    let dataId = req.params.userId
    let loginUser = validToken.userId
    if (loginUser != dataId)
      res.status(403).send({ msg: "not authorized" })
    else {
      let details = await userModel.findById(dataId)
      res.status(200).send({ msg: details })
    }
  } catch (error) {
    res.status(500).send(error.message)
  }
}


const updateUser = async function (req, res) {
  try {
    let token = req.headers["x-auth-token"]

    if (!token)
      res.status(401).send({ status: false, msg: "token is needed" })
    let validToken = jwt.verify(token, "just-bear-with-it")
    if (!validToken)
      res.status(401).send({ status: false, msg: "token is not valid" })

    let userData = req.body
    let dataId = req.params.userId
    let login = validToken.userId
    if (dataId != login)
      return res.status(403).send({ status: false, msg: "user is not authenticated" })
    let update = await userModel.findOneAndUpdate({ _id: dataId }, userData)
    res.status(200).send({ status: true, msg: update })
  } catch (error) {
    res.status(500).send(error.message)
  }

};
const deleteUser = async function (req, res) {
  try {
    let token = req.headers["x-auth-token"]
    if (!token)
      res.status(401).send({ status: false, msg: "token is needed" })
    let validToken = jwt.verify(token, "just-bear-with-it")
    if (!validToken)
      res.status(401).send({ status: false, msg: "token is not valid" })

    let data = req.params.userId
    let login = validToken.userId
    if (data != login)
      res.status(403).send({ status: false, msg: "user is not authenticated" })
    let isDeleted = await userModel.findByIdAndUpdate({ _id: data }, { isDeleted: true }, { new: true })
    res.status(200).send({ status: true, msg: isDeleted })
  } catch (error) {
    res.status(500).send(error.message)
  }
}

const getUserData1 = async function (req, res) {
  let details = await userModel.findById(req.dataId)
  res.status(201).send({ msg: details })
}

const updateUser1 = async function (req, res) {
  let userData = req.body
  let update = await userModel.findOneAndUpdate({ _id: req.dataId }, userData)
  res.status(200).send({ status: true, msg: update })
}

const deleteUser1 = async function (req, res) {
  let isDeleted = await userModel.findByIdAndUpdate({ _id: req.dataId }, { isDeleted: true }, { new: true })
    res.status(200).send({ status: true, msg: isDeleted })

}
module.exports.createUser = createUser;
module.exports.loginUser = loginUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
module.exports.getUserData1 = getUserData1;
module.exports.updateUser1 = updateUser1;
module.exports.deleteUser1 = deleteUser1;

