const authorModel=require("../models/authorModel.js")
const jwt = require("jsonwebtoken")
const validrequest=function(value){
  if(typeof value=="undefined"|| value==null) return false
  if (typeof value=="string"||value.trim().length>0) return true
  return false
}
const isrequest=function(value){
  return Object.keys(value).length>0
}
const regixValidator = function (value) {
  let regex = /^[a-zA-Z]+([\s][a-zA-Z]+)*$/
  return regex.test(value)
}
const regixemailvalidator=function(value){
  let regex=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  return regex.test(value)
}
const createAuthor= async function (req,res){
   
   try {
    let reqbody=req.body
    let reqquery=req.query
    if (!isrequest(reqbody))
      return res.status(400).send({msg:"body is required"})
    if(isrequest(reqquery))
      return res.status(400).send({msg:"query is not required"})
    const {fname,lname,title,email,password}=reqbody
    if(Object.keys(reqbody).length>5)
      return res.status(400).send({msg:"invalid key"})
    if (!validrequest(fname)||!regixValidator(fname))
      return res.status(400).send("invalid request")
   if (!validrequest(lname)||!regixValidator(lname))
      return res.status(400).send("invalid request")
    if(!validrequest(title))
      return res.status(400).send("invalid request")
    if(!validrequest(email)||!regixemailvalidator(email))
      res.status(400).send({msg:"invalid email"})
    if(!validrequest(password))
      res.status(400).send({msg:"invalid email"})
    
   } catch(error){
        res.status(500).send({error:"Server Not Found"})
    }
}


// login ----------------------------------------------------------------------

const loginUser = async function(req,res){
    try {
      let data = req.body
      if(Object.keys(data) != 0 && data.email && data.password)
      {
        let UserId = data.email
        let password = data.password
        let validUser = await authorModel.findOne({email:UserId, password:password})
         if(Object.keys(validUser).length != 0){
            let token = jwt.sign({UserId: validUser._id.toString()},"blog-site-project-01")
           return res.status(201).send({status:true, msg:token})
            
         } else {
             return res.status(400).send({status:false, msg: "user not found"})
         }
      }else {
      return res.status(400).send({status:false, msg:"invalid request"})
     
      }
    } catch (error) {
      res.status(400).send({ error: "Server Not Found" });
    }
  }
module.exports.createAuthor=createAuthor
module.exports.loginUser = loginUser