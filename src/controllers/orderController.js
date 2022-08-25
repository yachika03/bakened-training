const { count } = require("console")
const orderModel= require("../models/orderModel")
const productModel=require("../models/productModel")
const UserModel=require("../models/userModel")
const createOrder= async function (req, res) {
    let data = req.body
    if(req.headers.isfreeappuser){

        if(req.body.userId){
           
            let userData=await UserModel.findOne({_id:{$eq:data.userId}})
            if(userData){
                
                if(req.body.productId){
                   let productData=await productModel.findOne({_id:{$eq:data.productId}})
                    if(productData){
                        let headerData=req.headers.isfreeappuser
                        if(headerData=="true"){
                            data.amount=0
                            data.isFreeAppUser=req.headers.isfreeappuser
                          let createdUser=await orderModel.create(data)
                          res.send({msg:createdUser})

                            
                        }else{
                           let value = await productModel.findById(data.productId).select({price:1,_id:0})
                            let second=await UserModel.findById(data.userId).select({balance:1,_id:0})
                            console.log(value,second)
                            if(second.balance<value.price){
                                res.send({msg:"user has not sufficient amount" })
                            }else{
                                data.amount=value.price
                                let first=await UserModel.findByIdAndUpdate(data.userId).updateMany({ $inc: { balance: - value.price} })
                                data.isFreeAppUser=req.headers.isfreeappuser
                                let createdUser=await orderModel.create(data)
                                res.send({msg:createdUser})

                            }

                        }
                        
                    }else{
                        res.send({msg:"product is not found"})
                    }
                }else{
                    res.send({msg:"product id is Mandatory"})
                }

            }else{
                res.semd({msg:"user is not found"})
            }

        }else{
            res.send({msg:"userId is mandatory"})
        }
         
        
    }else{
        res.send({msg:"the request is missing a mandatory header"})
    }
}
// const createOrder= async function (req, res){
//     if(isfreeappuser=="true"){
//         data=req.body
//         data.amount=yachi
//         let createdUser=await orderModel.create(data)
//         res.send({msg:createdUser})
//     }else{
//         data=req.body
//         data.amount=req.update
//         data.isFreeAppUser=sabiha
//         let createdUser=await orderModel.create(data)
//         let first=await UserModel.findByIdAndUpdate(data.userId).updateMany({ $inc: { balance: - req.update} })
//         res.send({msg:createdUser})
       

//     }
   
// }

module.exports.createOrder= createOrder
