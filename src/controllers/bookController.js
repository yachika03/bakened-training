const bookModel= require("../models/bookModel")
const AuthorModel= require("../models/authorModel")
const PublisherModel= require("../models/publisherModel")
const mongoose = require('mongoose');
const { find } = require("../models/bookModel");
const publisherModel = require("../models/publisherModel");

const ObjectId=mongoose.Schema.Types.ObjectId


const createBook= async function (req, res) {
    const book = req.body
    const author_id=AuthorModel.name
    const publisher_id=bookModel.publisher_id
    let bookCreated = await bookModel.create(book)
   
    
   const validObjectId=function(ObjectId){
    return mongoose.Types.ObjectId.isValid("6300ac64e921b6e85be57ac7")
   }
   if(!validObjectId(author_id)){
    return res.send({ErrorMessage:"Id Not Valid"})
   }else{
    res.send({data: bookCreated})

   }
        
}

const update = { isHardCover:true };
const bookprice={ratings:{$gt:3.5}}
const priceinc={$inc:{price:10}}
const UpdateBook=async function(req,res){
    let BOOK=await bookModel.findById('6300ab7ae921b6e85be57abd').updateMany(update)
    let newbook=await bookModel.find(bookprice).updateMany(priceinc)
    

    res.send({data:newbook,BOOK})
}


const getBooksWithAuthorDetails = async function (req, res) {
    let specificBook = await bookModel.find().populate('author_id publisher_id')
    res.send({data: specificBook})

}

module.exports.UpdateBook= UpdateBook

module.exports.createBook= createBook
module.exports.getBooksWithAuthorDetails = getBooksWithAuthorDetails
