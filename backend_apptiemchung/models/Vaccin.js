const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    tenVaccin:{
        type:String,
        required:[true,'Please enter your vaccin'],
        trim:true,
        
    },
    hangSanXuat:{
        type:String,
        required:true,
        trim:true,
      
    },
    
    quocGia:{
        type:String,
        required:[true,'Vui lòng nhập quốc gia'],
      
       
    },
    loaiVaccin:{
        type:String,
        required:true,
        
        
    },
    doiTuongTiem:{
        type:String,
        required:true,
        
    },
    soMuiTiem:{
        type:Number,
        required:true
    },
    khoangCachTiem:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    thongbaotiem:{
        type:mongoose.Schema.ObjectId,
        ref:'thongBaoTiem'
    }
},{
    timestamps:true
})
module.exports = mongoose.model("Vaccin",userSchema)