const User = require('../models/User');
const sendEmail = require("../utils/sendEmail");
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const crypto = require('crypto');
const cloudinary  = require('cloudinary')
// register user
exports.registerUser = catchAsyncErrors(async(req,res,next)=>{
    const result = await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:'avatar',
        width:150,
        crop:'scale'
    })

    const {name,email,password} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:result.public_id,
            url:result.secure_url
        },
        
    })

  
    sendToken(user,200,res)

   
})

// login user
exports.loginUser = catchAsyncErrors(async(req,res,next)=>{
    const {email,password} = req.body;

    // check if email and password is entered by user
    if(!email || !password) {
        return next(new ErrorHandler('Please enter email & password',400))
    }

    // finding user in database
    const user = await User.findOne({email}).select('+password')

    if(!user){
        return next(new ErrorHandler('Invalid email or password',401))
    }


    // check if password is correct or not
    const isPasswordMatched = await user.comparePassword(password)

    if(!isPasswordMatched){
        return next(new ErrorHandler('Invalid password'))
    }

    sendToken(user,200,res);
})
// forgot password
exports.forgotPassword = async(req,res,next) => {
    const user = await User.findOne({email:req.body.email})

    if(!user){
        res.status(404).json({
            msg:'User not found with this email'
        })
    }

    // get resettoken
    const resetToken = user.getResetPasswordToken();

    await user.save({
        validateBeforeSave: false
    })

    // create reset password url
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`

    const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not 
    requested this email, then ignore it.
    `
    try {
        await sendEmail({
            email:user.email,
            subject:'Hệ thống quản lý tiêm chủng khôi phục mật khẩu',
            message
        })

        res.status(200).json({
            success:true,
            message:`Email đã gửi tới ${user.email}`
        })
    } catch (error) {
        user.resetPassswordToken = undefined;
        user.resetPassswordExpire = undefined;

        await user.save({
            validateBeforeSave: false
        })

        return next(
            res.status(500).json(error)
        )
    }
}
// reset password: /api/v1/password/reset/:token
exports.resetPassword = async(req,res,next) => {
    // hash url token 
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()}
    })
    if(!user){
        return (
            res.status(400).json({
                msg:'Password reset token is invalid or has been expired'
            })
        )
    }
    if(req.body.password !== req.body.confirmPasword){
        return (
            res.status(401).json({
                msg:'Password does not match'
            })
        )
    }

    // setup new password
    user.password = req.body.password;
    user.resetPassswordToken = undefined;
    user.resetPassswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res)
}

// logout user: api/v1/logout
exports.logout = async(req,res,next) => {
    res.cookie('token',null,{
        expires:new Date(Date.now()),
        httpOnly:true
    });
    res.status(200).json({
        success:true,
        message:'Loggod out'
    })
}