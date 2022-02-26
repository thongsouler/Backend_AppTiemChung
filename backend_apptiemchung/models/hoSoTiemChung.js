const mongoose = require("mongoose");
const hoSoTiemChung = new mongoose.Schema({
    soMuiTiem:{
        type:Number,
        required:true
    },
    ngayTiem:{
        type:Date,
        required:true
    },
    tinhTrang:{
        type:String,
        required:true
    },
    
},{
    timestamps:true
})
module.exports = mongoose.model("hoSoTiemChung",hoSoTiemChung)