const donViTiemChung = require("../models/donViTiemChung")
// dvtc: đơn vị tiêm chủng
exports.newDonViTiemChung = async(req,res) => {
    // user logged in 
    req.body.user = req.user.id;

    const dvtc = await donViTiemChung.create(req.body);

    res.status(201).json({
        success:true,
        dvtc
    })
}
// get all dvtc - by admin
exports.getAdminDonViTiemChung = async(req,res,next) => {
    
    
    const dvtcs = await donViTiemChung.find();
    res.status(200).json({
        success: true,
        count:dvtcs.length,
        dvtcs
    })
}
exports.getAllDonViTiemChung = async(req,res,next) => {
    
    
    const dvtcs = await donViTiemChung.find();
    res.status(200).json({
        success: true,
        count:dvtcs.length,
        dvtcs
    })
}

exports.getSingleDonViTiemChung = async(req,res,next) => {
    const dvtc = await donViTiemChung.findById(req.params.id);

    if(!dvtc){
       return next(new ErrorHandler('Không tìm thấy đơn vị tiêm chủng',404))
    }

    res.status(200).json({
        success:true,
        dvtc
    })
}

exports.updateDonViTiemChung = async (req,res,next) => {

    let dvtc = await donViTiemChung.findById(req.params.id);

    if(!dvtc){
        return res.status(404).json({
            success:false,
            message:'dvtc not found'
        })
    }

    dvtc = await donViTiemChung.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        success:true,
        dvtc
    })
}

// delete dvtc -admin
exports.deleteDonViTiemChung = async (req,res,next) => {

    let dvtc = await donViTiemChung.findById(req.params.id);

    if(!dvtc){
        return res.status(404).json({
            success:false,
            message:'Đơn vị tiêm chủng not found'
        })
    }

    await dvtc.remove()
    res.status(200).json({
        success:true,
        message:'Đơn vị tiêm chủng has been deleted'
    })
}