const authorModel = require("../models/authorModel.js");
const blogModel=require("../models/BlogModel.js")
const createBlog = async function (req, res) {
    try {
     let data = req.body;
     let authorId = data.authorId
     let validAuthorId = await authorModel.find(data)
     if(!authorId)
     return res.status(400).send({msg: "authorId is require"})
     else {
     let a = await authorModel.findOne({_id: authorId})
     if (!a)
     return res.status(400).send({msg:" authorId is not valid"})
     }
     if(!validAuthorId)
      return res.status(400).send({msg: "authorId is not valid"})
     let savedData = await blogModel.create(data);
     res.status(201).send({ msg: savedData });
    
    } catch (error) {
     res.status(400).send({error:"Server Not Found"})
    }
 }

 let getAllBlog = async function(req, res){
    try{
        let data = req.query
       let getBlogs = await blogModel.find({isPublished: true, isDeleted: false,...data}).populate("authorId").count()
       res.status(201).send({msg: getBlogs})
       if (getBlogs.length == 0)
       return res.status(404).send({msg:"no such blog exist"})
    }
    catch(error) {
        res.status(400).send({error:"Server Not Found"})
       }
    
 }


 module.exports.createBlog=createBlog
 module.exports.getAllBlog = getAllBlog

    