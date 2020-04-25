const jwt = require("jsonwebtoken");

module.exports = (req, res, next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        let decodedToken = jwt.verify(token, process.env.JWT_KEY);
        console.log("autherror", decodedToken);
        req.userData = {email: decodedToken.email, userId: decodedToken.userId}
        next();
    }catch(error){
        console.log("error", error);
        res.status(401).json({
            message: "You are not authenticated!"
        });
    }
}