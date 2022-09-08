const jwt = require("jsonwebtoken");

const authenticate = function(req, res, next) {

let token = req.headers["x-api-key"]
    if(!token) return res.status(400).send({status:false, msg:"token is needed"})
   let validToken = jwt.verify(token,"blog-site-project-01")
    if (!validToken) return res.status(400).send({status: false, msg: "token is Invalid"}) 
 next()
}


const authorise = function(req, res, next) {

// let token = req.headers["x-api-token"]
// let decodedToken = jwt.verify(token,"blog-site-project-01")
// let loggedInUser = validToken.authorId
// if(!loggedInUser) return res.status(400).send({status:false, msg: "not authorize"})
// let validAuthorId = req.params.authorId
// if(loggedInUser != validAuthorId) return res.status(400).send({status:false, msg:"not a valid user"})
req.id =  req.params.blogId;
let loginUser = validToken.authorId
if(loginUser != req.id) return res.status(403).send({status:false, msg: "not authorize"})

 next()
}
    
module.exports.authenticate = authenticate
module.exports.authorise = authorise