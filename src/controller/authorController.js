const authorModel=require("../models/authorModel.js")
const createAuthor= async function (req,res){
   
   try {let data =req.body
    let savedData=await authorModel.create(data)
    res.status(201).send ({msg: data})}
    catch{
        res.status(400).send({error:"Server Not Found"})
    
    }
}
module.exports.createAuthor=createAuthor