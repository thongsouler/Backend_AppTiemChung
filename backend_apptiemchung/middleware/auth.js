const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/User")
const jwt = require("jsonwebtoken")
// check if user is authenticated or not
exports.isAuthenticatedUser = async(req,res,next)=>{
    const {token} = req.cookies;
    // console.log(token)
    if(!token){
        // return next (new ErrorHandler('Login first to access this resource'))
        res.status(404).json({
            msg:'Login first to access this resource'
        })
    }

    // verify user
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id)

    next();
}

// handle users roles
exports.authorizeRoles = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.role)){
            return next(
                res.status(403).json({
                    msg:`Role (${req.user.role}) is not allowed to access this resource`
                })
            )
        }
        next();
    }
}
