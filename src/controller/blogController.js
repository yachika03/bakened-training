const blogModel=require("../models/BlogModel.js")
const createBlog = async function (req, res) {
    try {
     let data = req.body;
     let savedData = await BlogModel.create(data);
     res.status(201).send({ msg: savedData });
    
    } catch (error) {
     res.status(400).send({error:"Server Not Found"})
    }
 }

 module.exports.createBlog=createBlog
    