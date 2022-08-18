const { count } = require("console")
const authorModel= require("../models/authorModel")


const createAuthors= async function (req, res) {
    let AuthorData=req.body
    let allauthor=await authorModel.create(AuthorData)
    res.send({msg:allauthor})
    }
    module.exports.createAuthors=createAuthors
    