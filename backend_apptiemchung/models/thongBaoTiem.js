const mongoose = require("mongoose")
const validator = require("validator")
const thongBaoTiem = new mongoose.Schema({
    dotTiem:{
        type:String,
        required:true
    },
    ngayTiem:{
        type:Date,
        required:true
    },
    startDate:{
        type:Date,
        required:true
    },
    endDate:{
        type:Date,
        required:true
    },
    vaccin:{
        type:mongoose.Schema.ObjectId,
        ref:'Vaccin',
        // required:true
    },
    dvtc:{
        type:mongoose.Schema.ObjectId,
        ref:'donViTiemChung',
        required:true
    },
    soLuongNguoi:{
        type:Number,
        default:'Không'
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
},{
    timestamps:true
})

module.exports = mongoose.model("thongBaoTiem",thongBaoTiem)