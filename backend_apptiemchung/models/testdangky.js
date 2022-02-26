const mongoose = require("mongoose")
const validator = require("validator")
const testdangKyTiemChungSchema = new mongoose.Schema({
    nhomUuTien: {
        type: String,
        default: '4. Không có'
    },
    muiTiemThu: {
        type: String,
        default: 'Thứ nhất'
        // required:true
    },
   
    buoiTiem: {
        type: String,
        default: 'Buổi sáng'
    },

    dvtc: {

        type: String,
        default: 'Trạm y tế Phường Việt Hưng'
    },
    // dotTiem:{
    //     type:String,
    //     // required:true
    // },
    
     
    status: {
        type: String,
        default: "Đang xử lý"
    },
    
    
// }, {
//     timestamps: true
})
module.exports = mongoose.model("testDangky", testdangKyTiemChungSchema)