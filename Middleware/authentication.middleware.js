const jwt = require("jsonwebtoken");


const authentication = (req,res,next)=>{
    const token = req.headers.authorization;
    jwt.verify(token, 'evalution04',(err, decoded)=> {
       if(decoded){
        // console.log(decoded)
        req.body.userID = decoded._id
        next();
       }
       else{
        res.send("Please login")
       }
      });
}

module.exports = {
    authentication
}

