const User = require("../models/User");
const sendToken = require("../utils/jwtToken");
const cloudinary  = require('cloudinary')
// get currently logged in user details /api/v1/me
exports.getUserProfile = async(req,res,next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success:true,
        user
    })
}

// update/ change password => /api/v1/password/update
exports.updatePassword = async(req,res,next) =>{
    const user = await User.findById(req.user.id).select('+password');

    // check previous user password; (in models)
    const isMatched = await user.comparePassword(req.body.oldPassword)
    if(!isMatched){
        return (
            res.status(400).json({
                msg:'Password is incorrect'
            })
        )
    }
    user.password = req.body.password;
    await user.save();

    sendToken(user,200,res)

    
}

// update user profile => /api/v1/me/update
exports.updateProfile = async(req,res,next) => {
    const newUserData = {
        name:req.body.name,
        email:req.body.email,
        dateOfBirth:req.body.dateOfBirth,
        phoneNumber:req.body.phoneNumber,
        gioiTinh:req.body.gioiTinh,
        CMND:req.body.CMND,
    }

    // update avatar
    if(req.body.avatar !== ''){
        const user = await User.findById(req.user.id)
        const image_id = user.avatar.public_id;
        const res = await cloudinary.v2.uploader.destroy(image_id);

        const result = await cloudinary.v2.uploader.upload(req.body.avatar,{
            folder:'avatar',
            width:150,
            crop:'scale'
        })

        newUserData.avatar = {
            public_id:result.public_id,
            url:result.secure_url
        }
    }
    
    const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        success:true,
        user
    })
}

// admin routes
// get all users api/v1/admin/users 
exports.allUsers = async(req,res,next) => {
    const users = await User.find();
    console.log(users);
    res.status(200).json({
        success:true,
        users
    })
}

// get user details => /api/v1/admin/user/:id
exports.getUserDetails = async(req,res,next)=>{
    const user = await User.findById(req.params.id)

    if(!user){
        return (
            res.status(400).json({
                msg:`User does not found with id: ${req.params.id}`
            })
        )
    }
    res.status(200).json({
        success:true,
        user
    })
}

// api/v1/admin/user/:id
exports.updateUser = async(req,res,next) => {
    const newUserData = {
        name:req.body.name,
        email:req.body.email,
        role:req.body.role,
       
    }

    const user = await User.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        success:true,
        user
    })
}

// delete user = > /api/v1/auth/user/:id
exports.deleteUser = async(req,res,next)=>{
    const user = await User.findById(req.params.id)

    if(!user){
        return (
            res.status(400).json({
                msg:`User does not found with id: ${req.params.id}`
            })
        )
    }
    // remove avatar from cloudinary
    await user.remove();
    res.status(200).json({
        success:true,
        
    })
}