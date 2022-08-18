const { count } = require("console")
const BookModel= require("../models/bookModel")
const authorModel=require("../models/authorModel")

const createBook= async function (req, res) {
    let data= req.body

    let savedData= await BookModel.create(data)
    res.send({msg: savedData})
}

const getBooksData= async function (req, res) {
    let allBooks= await BookModel.find( {authorName : "HO" } )
    console.log(allBooks)
    if (allBooks.length > 0 )  res.send({msg: allBooks, condition: true})
    else res.send({msg: "No books found" , condition: false})
}


const updateBooks= async function (req, res) {
    let data = req.body // {sales: "1200"}
    // let allBooks= await BookModel.updateMany( 
    //     { author: "SK"} , //condition
    //     { $set: data } //update in data
    //  )
    let allBooks= await BookModel.findOneAndUpdate( 
        { authorName: "ABC"} , //condition
        { $set: data }, //update in data
        { new: true , upsert: true} ,// new: true - will give you back the updated document // Upsert: it finds and updates the document but if the doc is not found(i.e it does not exist) then it creates a new document i.e UPdate Or inSERT  
     )
     
     res.send( { msg: allBooks})
}

const deleteBooks= async function (req, res) {
    // let data = req.body 
    let allBooks= await BookModel.updateMany( 
        { authorName: "FI"} , //condition
        { $set: {isDeleted: true} }, //update in data
        { new: true } ,
     )
     
     res.send( { msg: allBooks})
}



// CRUD OPERATIONS:
// CREATE
// READ
// UPDATE
// DELETE



module.exports.createBook= createBook
module.exports.getBooksData= getBooksData
module.exports.updateBooks= updateBooks
module.exports.deleteBooks= deleteBooks
const CreateBooks= async function (req, res) {
    let data= req.body

    let savedData= await BookModel.create(data)
    res.send({msg: savedData})
}
module.exports.CreateBooks=CreateBooks

const findBooks= async function(req,res)
{
    let data= await authorModel.findOne({author_Name:"Chetan Bhagat"}).select({author_id:1 ,_id:0})
    let all = await BookModel.find({author_id:{$eq:data.author_id}})
    res.send({msg:all})
}
module.exports.findBooks=findBooks
const findAuthor=async function (req,res){
    let data=await BookModel.findOne({ Name:"Two states"}).select({author_id:1,_id:0})
    let All=await authorModel.findOne({author_id:{$eq:data.author_id}}).select({author_Name:1,_id:0})
    let list=await BookModel.findOneAndUpdate({author_Name:All.authorName},{$set:{price:100}},{new:true})
    res.send({msg:list,All})
}
module.exports.findAuthor=findAuthor

const findPrice=async function(req,res){
    let data=await BookModel.find({price:{$gte:50},price:{$lte:100}}).select({author_id:1,_id:0})
    const unique=[...new Set(data.map(item=>item.author_id))]
    let allData=await authorModel.find({author_id:{$in:unique}}).select({author_Name:1,_id:0})
     res.send({msg:allData})
}
module.exports.findPrice=findPrice