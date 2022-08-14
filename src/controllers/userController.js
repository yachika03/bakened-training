const UserModel= require("../models/userModel")

const createUser= async function (req, res) {
    let data= req.body
    let savedData= await UserModel.create(data)
    res.send({msg: savedData})
}

const getUsersData= async function (req, res) {
    let allUsers= await UserModel.find()
    res.send({msg: allUsers})
}

module.exports.createUser= createUser
module.exports.getUsersData= getUsersData








const createbooks=async function(req,res){
    let bookData=req.body
    let booksavedData=await UserModel.create(bookData)
    res.send({msg: booksavedData})
}
const getbooksdata= async function (req, res) {
    let allbooks= await UserModel.find()
    res.send({msg: allbooks})
}
module.exports.createbooks= createbooks
module.exports.getbooksdata=getbooksdata


