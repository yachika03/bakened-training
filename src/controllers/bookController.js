const authorModel = require("../models/authorModel")
const bookModel= require("../models/bookModel")
const publisherModel=require("../models/publisherModel")


const createBook= async function (req, res) {
    let book = req.body
   
    let bookCreated = await bookModel.find(book)
    if(!book.author)
        res.send({msg:"author is required"})
    else{
        let a=await authorModel.findOne({_id:{$eq:book.author}})
        if(a) {
             if (!book.publisher)
                res.send({msg:"publisher is required"})
             else{
                let p=await publisherModel.findOne({_id:{$eq:book.publisher}})
                if (p){
                    let bookdata=await bookModel.create(book)
                    res.send({msg:bookdata})
                }else
                 res.send({msg:"publisher not found"})
        }     }else
                 res.send({msg:"author is not found"})
             

    }
        
}

const getBooksData= async function (req, res) {
    let books = await bookModel.find()
    res.send({data: books})
}

const getBooksWithAuthorDetails = async function (req, res) {
    let specificBook = await bookModel.find().populate(['author','publisher'])
    res.send({data: specificBook})

}
const updatethebooks =async function(req,res){
                
    let b=await publisherModel.find({"name":["penguin","HarperCollins"]}).select({_id:1})
    let c=await bookModel.find({"publisher":b}).updateMany({$set:{isHardcover:true}},{new:true})
    res.send({msg:c})
    
}


const updateprice=async function(req,res){
    let data=await authorModel.find({"rating":{$gt:3.5}}).select({_id:1})
    let b=await bookModel.find({"author":data}).updateMany({$inc:{price:10}})
    res.send({msg:b})
}
    module.exports.updatethebooks=updatethebooks
    module.exports.updateprice=updateprice

module.exports.createBook= createBook
module.exports.getBooksData= getBooksData
module.exports.getBooksWithAuthorDetails = getBooksWithAuthorDetails
