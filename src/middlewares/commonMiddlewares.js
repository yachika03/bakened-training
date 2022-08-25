
const mid1= function ( req, res, next) {
    if(req.headers.isfreeappuser){
         
        
       req.yachika=req.headers.isfreeappuser
        next()
    }else{
        res.send({msg:"the request is missing a mandatory header"})
    }
    
}

const mid2= async function  ( req, res, next) {
    
    if(req.headers.isfreeappuser){

        if(req.body.userId){
           
            let userData=await UserModel.findOne({_id:{$eq:data.userId}})
            if(userData){
                
                if(req.body.productId){
                   let productData=await productModel.findOne({_id:{$eq:data.productId}})
                    if(productData){
                        let headerData=req.headers.isfreeappuser
                        if(headerData=="true"){
                            
                            req.yachi=0
                            next()
                            
                        }else{
                           let value = await productModel.findById(data.productId).select({price:1,_id:0})
                            let second=await UserModel.findById(data.userId).select({balance:1,_id:0})
                            if(second.balance<value.price){
                                res.send({msg:"user has not sufficient amount" })
                            }else{
                                 
                                 req.update=value.price
                                 req.sabiha=req.headers.isfreeappuser
                                next()

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




module.exports.mid1= mid1
module.exports.mid2= mid2
