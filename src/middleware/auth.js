const authMid= async function(req,res,next){
let token = req.headers["x-Auth-token"];
  if (!token) token = req.headers["x-auth-token"];
  if (!token) return res.send({ status: false, msg: "token must be present" });

  
  let decodedToken = jwt.verify(token, "yachika-your-secret-Token");
  if (!decodedToken)
    return res.send({ status: false, msg: "token is invalid" });

  req.userId = req.params.userId;
  let userDetails = await userModel.findById(req.userId);
  if (!userDetails)
    return res.send({ status: false, msg: "No such user exists" });

  next()
}
module.exports.authMid=authMid