const authenticate = function(req, req, next) {
    let token =req.headers["x-Auth-token"]
if(!token)
  token=req.headers["x-auth-token"]
if(!token)
  return res.send({status:false,msg:"token is needed"})
let validToken=jwt.verify(token,"my-secret-secret-Key")
if(!validToken)
 return res.send({status:false,msg:"token is not valid"})
  next()
}


const authorise = function(req, res, next) {
req.data=req.params.userId
let login=validToken.userId
if(req.data!=login)
return res.send({status:false,msg:"user is not authenticated"})
 next()
}
module.exports.authorise=authorise
module.exports.authenticate=authenticate