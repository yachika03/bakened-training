const bookModel= require("../models/bookModel")
const AuthorModel= require("../models/authorModel")
const PublisherModel= require("../models/publisherModel")
const mongoose = require('mongoose');
const publisherModel = require("../models/publisherModel");
const authorModel = require("../models/authorModel");

const ObjectId=mongoose.Schema.Types.ObjectId


const createBook= async function (req, res) {
    const book = req.body
    const authorId=book.author_id
    const publisherId=book.publisher_id
   
    if (!authorId){
        return res.send({status:false,msg:"Author_id is mandatory"})
    
    }
    const author=await AuthorModel.findById(authorId)
    if(!author){
        return res.send({status:false,msg:"Author not found"})

    }
    if (!publisherId){
        return res.send({status:false,msg:"Publsiher_id is mandatory"})
    
    }
    const publisher=await PublisherModel.findById(publisherId)
    if(!publisher){
        return res.send({status:false,msg:"publisher not found"})

    }
    let bookCreated = await bookModel.create(book)
    res.send({data: bookCreated})

   
}


const UpdateBook=async function(req,res){

    let requiredPublishers = 
    await publisherModel.find({$or: [{name: "Penguin"},{name: "HarperCollins"}]}, {_id: 1})
    //let books = await bookModel.find().populate('publisher')
    //for
    let requiredPublisherIds = [] 
    for (let i = 0; i < requiredPublishers.length; i++) {
        requiredPublisherIds.push(requiredPublishers[i]._id)
    }

    let BOOK=await bookModel.updateMany({publisher : {$in: requiredPublisherIds}}, {isHardCover: true}, {new: true})
res.send({data: ratingsbook})
}








const getBooksWithAuthorDetails = async function (req, res) {
    let specificBook = await bookModel.find().populate('author_id publisher_id')
    res.send({data: specificBook})

}



module.exports.UpdateBook= UpdateBook

module.exports.createBook= createBook
module.exports.getBooksWithAuthorDetails = getBooksWithAuthorDetails
