const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const dangKyTiemChung = require("../models/dangKyTiemChung");

exports.ChungNhanTiem = async(req,res) =>{
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

exports.chungNhanTiemCaNhan = catchAsyncErrors(async(req,res,next) =>{
    const danhsach =  dangKyTiemChung.find({user:req.params.id})
                                     .populate({path:'vaccin'})
                                     .populate({path:'dvtc'})
                                     .populate({path:'user'})
                                     .exec((err,hoso)=>{
        if(err) return (err);
        // console.log(hoso);
 
        res.status(200).json({
         success:true,
         hoso
     })
    })
  
})