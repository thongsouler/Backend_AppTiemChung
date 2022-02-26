
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const dangKyTiemChung = require("../models/dangKyTiemChung");
const thongBaoTiem = require("../models/thongBaoTiem");

exports.ThongBaoDanhSachTiem = async(req,res) =>{
    dangKyTiemChung.find()
         .populate({path:'user'})
        //  .populate({path:'vaccin',select:'tenVaccin'})
         .exec(function(err,list){
    if(err) return err;
    console.log(list);
    res.status(200).json({
     success:true,
     list
 })
})
}

exports.newThongBaoTiem = catchAsyncErrors(async(req,res) => {
    // user logged in 
    req.body.user = req.user.id;
    
    const newThongBao = await thongBaoTiem.create(req.body);
    const dktc = await thongBaoTiem.populate(newThongBao,[{
        path:'vaccin'
    },{path:'dvtc'},{path:'user'}]);
    res.status(201).json({
        success:true,
        dktc,
        
    })
 
})
// exports.getThongBaoTiem = catchAsyncErrors(async(req,res) => {
//     // user logged in 

    
//     const newThongBao = await thongBaoTiem.create(req.body);
//     const dktc = await thongBaoTiem.populate(newThongBao,{
//         path:'vaccin'
//     });
//     res.status(201).json({
//         success:true,
//         dktc,
        
//     })
 
// })
