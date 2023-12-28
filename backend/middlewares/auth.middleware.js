const jwt=require("jsonwebtoken");
const User=require("../models/user.model");

const authMiddleware=async(req,res,next)=>{
    const token=req.headers["authorization"]?.split(" ")[1];
    if(!token){
        res.status(403).send("first Forbidden");
    }else{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.findOne({username : decoded.username}).select(
            "-password"
        );
        req.user=user;
        if(user.role==1){
            next();
        }else{
            res.status(403).send("second Forbidden");
        }
        
    }
};

module.exports = {
    authMiddleware,
};