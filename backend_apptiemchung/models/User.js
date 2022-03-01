const mongoose = require('mongoose');
const validator = require("validator")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter your name'],
        maxLength:[30,"Your name cannot exceed 30 characters"],
        unique:true
    },
    email:{
        type:String,
        required:[true,'Please enter your email'],
        unique:true,
        validate:[validator.isEmail,'Please enter valid email']
    },

    password:{
        type:String,
        required:[true,'Please enter your password'],
        minlength:[6,"Your passwords cannot exceed 10 characters"],
        select:false,
    },
    role:{
        type:String,
        enum:['user','admin','Tổ chức','Đơn vị tiêm chủng'],
        default:'user'
    },
    avatar:{
        public_id:{
            type:String,
            required:true,

        },
        url:{
            type:String,
            required:true
        }
    },
    dateOfBirth:{
        type:Date,
        default:"2000/01/01"
    },
    phoneNumber:{
        type:Number,
        default:'012346549'
    },
    gioiTinh:{
        type:String,
        default:"Nam"
    },
    CMND:{
        type:Number,
        default:'0122256789'
        
    },
    Address:{
        type:String,
        default:"Hà Nội"
    },
    job:{
        type:String,
        default:'Nông dân'
    },
    wardName:{
        type:String,
        default:'Phường Phương Liệt'
    },
    districtName:{
        type:String,
        default:'Quận Hoàng Mai'
    },
    provinceName:{
        type:String,
        default:'Thành phố Hà Nội'
    },
    dangkyTiem:{
        type:mongoose.Schema.ObjectId,
        ref:'dangKyTiemChung',
        
    },
    vaccin:{
        type:mongoose.Schema.ObjectId,
        ref:'Vaccin',
        
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
},{
    timestamps:true
})
// encrypting password before saving user
userSchema.pre('save',async function(next) {
    if(!this.isModified('password')){
        next()
    }
    this.password = await bcrypt.hash(this.password,10)
})
// compare user password  
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}
// return jwt token
userSchema.methods.getJwtToken = function(){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_TIME 
    });
}


// generate password reset token
userSchema.methods.getResetPasswordToken = function(){
    // generate token https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback
    const resetToken = crypto.randomBytes(20).toString('hex');

    // hash and set to resetpasswordtoken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // set token expire time 30minutes
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;
    return resetToken;
}
module.exports = mongoose.model("User",userSchema)