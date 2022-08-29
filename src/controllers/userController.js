const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const createUser = async function (req, res) {
  
  let data = req.body;
  let savedData = await userModel.create(data);
  console.log(req.newAtribute);
  res.send({ msg: savedData });
};

const loginUser = async function (req, res) {
  let userName = req.body.emailId;
  let password = req.body.password;

  let user = await userModel.findOne({ emailId: userName, password: password });
  if (!user)
    return res.send({
      status: false,
      msg: "username or the password is not corerct",
    });
  let token = jwt.sign(
    {
      userId: user._id.toString(),
      batch: "plutonium",
      organisation: "FunctionUp",
    },
    "yachika-your-secret-Token"
  );
  res.setHeader("x-auth-tokercn", token);
  res.send({ status: true, token: token });
};

const getUserData = async function (req, res) {
  let token = req.headers["x-Auth-token"];
  if (!token) token = req.headers["x-auth-token"];
  if (!token) return res.send({ status: false, msg: "token must be present" });

  console.log(token);
  let decodedToken = jwt.verify(token, "yachika-your-secret-Token");
  if (!decodedToken)
    return res.send({ status: false, msg: "token is invalid" });

  let userId = req.params.userId;
  let userDetails = await userModel.findById(userId);
  if (!userDetails)
    return res.send({ status: false, msg: "No such user exists" });

  res.send({ status: true, data: userDetails });
  
};


const updateUser = async function (req, res) {
  let token = req.headers["x-Auth-token"];
  if (!token) token = req.headers["x-auth-token"];
  if (!token) return res.send({ status: false, msg: "token must be present" });

  console.log(token);
  let decodedToken = jwt.verify(token, "yachika-your-secret-Token");
  if (!decodedToken)
    return res.send({ status: false, msg: "token is invalid" });

  
  let userId = req.params.userId;
  let user = await userModel.findById(userId);
  if (!user) {
    return res.send("No such user exists");
  }

  let userData = req.body;
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData);
  res.send({ status: updatedUser, data: updatedUser });
};
const deleteUser = async function (req, res) {
  let token = req.headers["x-Auth-token"];
  if (!token) token = req.headers["x-auth-token"];
  if (!token) return res.send({ status: false, msg: "token must be present" });

  console.log(token);
  let decodedToken = jwt.verify(token, "yachika-your-secret-Token");
  if (!decodedToken)
    return res.send({ status: false, msg: "token is invalid" });
    let userId = req.params.userId;
  let user = await userModel.findById(userId);
  if (!user) {
    return res.send("No such user exists");
  }

  
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, {isDeleted:true});
  res.send({ status: updatedUser, data: updatedUser });

}
// api with the help of middleware
const getUserData1=async function(req,res){
  let data=await userModel.find(req.userId)
  res.send({status:true,msg:data})
}
const updatedUser1= async function(req,res){
  let data1=req.body
  let data=await userModel.findOneAndUpdate((req.userId),data1)
  res.send({msg:data,status:true})

}
const deleteUser1=async function(req,res){
  let data= await userModel.findOneAndUpdate((req.userId),{isDeleted:false})
  res.send({msg:data,status:true})
}

module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser = deleteUser
module.exports.getUserData1=getUserData1
module.exports.updatedUser1 = updatedUser1;
module.exports.deleteUser1 = deleteUser1
