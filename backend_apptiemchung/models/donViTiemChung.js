const mongoose = require("mongoose");
const donViTiemChung = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    wardName:{
        type:String,
        required:true
    },
    districtName:{
        type:String,
        required:true
    },
    provinceName:{
        type:String,
        required:true
    },
    picFullname:{
        type:String,
        required:true
    },
    injectionTable:{
        type:Number,
        required:true
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    
},{
    timestamps:true
})
module.exports = mongoose.model("donViTiemChung",donViTiemChung)