const authorModel=require("../models/authorModel.js")

 

 
const createAuthor= async function (req,res){
   
   try {let data =req.body
    if(Object.keys(data).length != 0 ){
    
    let validateEmail = data.email
    if(!validateEmail)
    return res.status(400).send({msg: "Email is require"})
    
    let uniqueEmail = await authorModel.findOne({email: data.email})
    if(uniqueEmail)
    return res.status(400).send({msg: "email is not unique" })

    

    let savedData=await authorModel.create(data)
    res.status(201).send ({msg: savedData})
   }  else  {
       return res.status(400).send({msg: "invalid request"}) }}
    catch{
        res.status(400).send({error:"Server Not Found"})
    
    }
}
module.exports.createAuthor=createAuthor