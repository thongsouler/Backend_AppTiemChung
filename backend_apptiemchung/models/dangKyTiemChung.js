const mongoose = require("mongoose")
const validator = require("validator")
const dangKyTiemChungSchema = new mongoose.Schema({
    nhomUuTien: {
        type: String,
        default: 'Không có'
    },
    muiTiemThu: {
        type: String,
        default: 'Thứ nhất'
        // required:true
    },
    ngayTiem: {
        type: Date,
        // required:true
    },
    buoiTiem: {
        type: String,
    },
    tiensuBenh: {
        type: Array,
        default: 'Không có'
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },

    vaccin: {
        type: String,
        // ref:'Vaccin',

    },

    dvtc: {

        type: String
    },
    // dotTiem:{
    //     type:String,
    //     // required:true
    // },
    ngayTiem: {
        type: Date,
        // required:true
    },
    startDate: {
        type: Date,

    },
    endDate: {
        type: Date,

    },
    khungGioTiem: {
        type: String,
        default: "8h00-9h00"
    },
    solo: {
        type: String,
        default: 'PV46707'
    },
    trieuChungSauTiem: {
        type: String,
        default: "Không có"
    },
    status: {
        type: String,
        default: "Đang xử lý"
    },
    amount: {
        type: String,
    },
    isComplete: {
        type: String,
        default: "Chưa tiêm"
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("dangKyTiemChung", dangKyTiemChungSchema)