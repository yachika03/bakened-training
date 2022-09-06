const { default: mongoose } = require("mongoose");
const authorModel = require("../models/authorModel.js");
const blogModel = require("../models/BlogModel.js");
//const mongoose = require("mongoose")

// const isValidObjectId = (ObjectId) => {
//     return mongoose.Types.ObjectId.isValid(ObjectId);
//   };

// create Blog |----------------------------------------------------------------
const createBlog = async function (req, res) {
  try {
    let data = req.body;
    let authorId = data.authorId;
    let validAuthorId = await authorModel.find(data);
    if (!authorId) return res.status(400).send({ msg: "authorId is require" });
    else {
      let a = await authorModel.findOne({ _id: authorId });
      if (!a) return res.status(400).send({ msg: " authorId is not valid" });
    }
    if (!validAuthorId)
      return res.status(400).send({ msg: "authorId is not valid" });
    let savedData = await blogModel.create(data);
    res.status(201).send({ msg: savedData });
  } catch (error) {
    res.status(400).send({ error: "Server Not Found" });
  }
};

// get Blogs |----------------------------------------------------------------
let getAllBlog = async function (req, res) {
  try {
    let data = req.query;
    let getBlogs = await blogModel
      .find({ isPublished: true, isDeleted: false, ...data })
      .populate("authorId")
      .count();
    res.status(201).send({ msg: getBlogs });
    if (getBlogs.length == 0)
      return res.status(404).send({ msg: "no such blog exist" });
  } catch (error) {
    res.status(400).send({ error: "Server Not Found" });
  }
};

// put Blogs |----------------------------------------------------------------

let getBlog = async function (req, res) {
  try {
    let data = req.body;
    let id = req.params.blogId;
    
    
    let findBlogId = await blogModel.findById(id);
    if (!id)
      return res.status(400).send({ status: false, msg: "no such BlogId exists" });
    if (findBlogId.isDeleted)
      return res.status(400).send({ status: false, msg: "blog is already deleted" });
      let updatedBlog = await blogModel.findOneAndUpdate({_id:id},data,{new:true})
       res.status(200).send({status: true, msg: updatedBlog})
  } catch (error) {
    res.status(400).send(error.message);
  }
};

let deleteBlog = async function(req , res){
    try {
        let data = req.params.blogId
        let blogId = await blogModel.findById(data)
        let deleteId = blogId.isDeleted
        if(!blogId)
        return res.status(400).send({status: false, msg: "blog Id not found"})
        if (deleteId)
        return res.status(400).send({status: false, msg: "data is deleted"})
        let timestamps = new Date 
         await blogModel.findOneAndUpdate({_id:blogId},{isDeleted:true, isPublished:false,deletedAt:timestamps})
        res.status(200).send({status:true, msg: "blog Deleted successfully"})

    } catch (error) {
        res.status(400).send(error.message); 
    }
}


let deleteBlogs = async function(req,res){
    try {
        let timestamps = new Date()
       let data = req.query
    //    let getNotDeleted = blogModel.find({isDeleted:false})
    // if(getNotDeleted.length == 0)
    // res.status(400).send({status:false, msg: "blog already deleted"})
       let deleteData = await blogModel.findOneAndUpdate({isDeleted:true, deletedAt:timestamps, ...data})
       res.status(200).send({status:true, msg:deleteData})
  } catch (error) {
    res.status(400).send({ error: "Server Not Found" });
  }
}


module.exports.createBlog = createBlog;
module.exports.getAllBlog = getAllBlog;
module.exports.getBlog = getBlog;
module.exports.deleteBlog = deleteBlog
module.exports.deleteBlogs = deleteBlogs