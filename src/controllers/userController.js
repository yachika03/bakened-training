const UserModel= require("../models/userModel")
const createUser= async function (req, res) {
    let data=req.body
    if(req.headers.isfreeappuser){
         
        data.isFreeAppUser=req.headers.isfreeappuser
        let createdUser=await UserModel.create(data)
        res.send({msg:createdUser})
    }else{
        res.send({msg:"the request is missing a mandatory header"})
    }
}
// const createUser= async function (req, res) {

//     let data=req.body
//     data.isFreeAppUser=req.yachika
//     let createdUser=await UserModel.create(data)
//     res.send({msg:createdUser})
// }


const getUsersData= async function (req, res) {
    let allUsers= await UserModel.find()
    res.send({msg: allUsers})
}

module.exports.createUser= createUser
module.exports.getUsersData= getUsersData
