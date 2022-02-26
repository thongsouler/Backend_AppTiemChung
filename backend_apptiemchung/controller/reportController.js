const catchAsyncErrors = require("../middleware/catchAsyncErrors")
const dangKyTiemChung = require("../models/dangKyTiemChung")
const User = require("../models/User")
const moment = require("moment")
// filter age >18 
exports.reportByAge = catchAsyncErrors(async(req,res) => {
    let dateString = "2003-01-01T00:00:00.000Z"
    console.log(typeof(dateString));
    const data = User.find({
        dateOfBirth:{
            $gte:[
                {"$dateFromString":{"dateString":"$dob","format": "%m-%d-%Y"}},
                ISODate("2003-01-02T00:00:00Z")
            ]
        }
    })
    res.status(200).json({
        success:true,
        data
    })
})

// thống kê tháng trước đó
exports.lastMonth = catchAsyncErrors(async(req,res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth()-1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth()-1));

    const income = await dangKyTiemChung.aggregate([
        {
            $match:{createdAt:{$gte:previousMonth}}
        },
        {
            $project:{
                month:{$month:"$createdAt"},
                report:"$amount"
            }
        },
        {
            $group:{
                _id:"$month",
                total:{$sum:"$report"}
            }
        }
    ])
    res.status(200).json(income)
})