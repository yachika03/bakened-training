const jwt = require("jsonwebtoken");
const { findById } = require("../models/userModel");
const userModel = require("../models/userModel");

const createUser = async function (req, res) {
  let data=req.body
  let saveData= await userModel.create(data)
  res.send({status:true,msg:saveData})
  
};

const loginUser = async function (req, res) {
 let userId=req.body.emailId
 let password=req.body.password
 let db= await userModel.findOne({emailId:userId,password:password})
 if(!db)
  return res.send({status:false,msg:"value is not present"})

 let token= jwt.sign({userId:db._id.toString()}, "my-secret-secret-Key")
//  res.setheaders("yachi",token)
 res.send({status:true,msg:token})
  
 
};

const getUserData = async function (req, res) {
let token=req.headers["x-Auth-token"]
if(!token) 
  token =req.headers["x-auth-token"]
if(!token)
return res.send({status:false,msg:"token is must"})
let decodedToken=jwt.verify(token,"my-secret-secret-Key")
if(!decodedToken)
return res.send({status:false,msg:"token is not valid"})
// authorization
let data=req.params.userId
let loginUser=decodedToken.userId
if (data!=loginUser)
return res.send({status:false,msg:"user is not authorised"})
let details=await userModel.findById(data)
res.send({status:true,msg:details})

};


const updateUser = async function (req, res) {
let token =req.headers["x-Auth-token"]
if(!token)
  token=req.headers["x-auth-token"]
if(!token)
  return res.send({status:false,msg:"token is needed"})
let validToken=jwt.verify(token,"my-secret-secret-Key")
if(!validToken)
 return res.send({status:false,msg:"token is not valid"})
// authorization
let userData=req.body
let data=req.params.userId
let login=validToken.userId
if(data!=login)
return res.send({status:false,msg:"user is not authenticated"})
let update=await userModel.findOneAndUpdate({_id:data},userData)
res.send({status:true,msg:update})
 
};

const deleteUser= async function(req,res){
  let token=req.headers["x-Auth-token"]
  if(!token)
    token=req.headers["x-auth-token"]
  if(!token)
   return res.send({status:false,msg:"token is not found"})
  let validToken=jwt.verify(token,"my-secret-secret-Key")
  if(!validToken)
    res.send({status:false,msg:"token is not valid"})
    //authrization
  let data=req.params.userId
  let login=validToken.userId 
  if(data!=login)
    return res.send({status:false,msg:"not authorised user"})
  let isDeleted=await userModel.findByIdAndUpdate({_id:data},{isDeleted:true},{new:true})
  res.send({status:true,msg:isDeleted})
  
  

  
  
}
const getUserData1=async function (req,res){
  
  let details=await userModel.findById(req.data)
res.send({status:true,msg:details})

}
const updateUser1=async function(req,res){
  let userData=req.body
  let update=await userModel.findOneAndUpdate({_id:req.data},userData)
res.send({status:true,msg:update})
 

}
const deleteUser1=async function(req,res){
  let isDeleted=await userModel.findByIdAndUpdate({_id:req.data},{isDeleted:true},{new:true})
  res.send({status:true,msg:isDeleted})
  
}

module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteUser =deleteUser
module.exports.updateUser1 = updateUser1;
module.exports.getUserData1 = getUserData1;
module.exports.deleteUser1 =deleteUser1
