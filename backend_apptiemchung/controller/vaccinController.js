const Vaccin = require("../models/Vaccin");
const ErrorHandler = require("../middleware/error");
const APIFeatures = require("../utils/apiFeatures")
// create new vaccins 
exports.newVaccin = async(req,res) => {
    // user logged in 
    req.body.user = req.user.id;

    const vaccin = await Vaccin.create(req.body);

    res.status(201).json({
        success:true,
        vaccin
    })
}
// get all vaccins
exports.getAdminVaccins = async(req,res,next) => {
    

    const vaccins = await Vaccin.find();
    res.status(200).json({
        success: true,
        count:vaccins.length,
        vaccins
    })
}

// get all vaccins /api/v1/vaccins?keyword=covax
exports.getVaccins = async(req,res,next) => {
    const apiFeatures = new APIFeatures(Vaccin.find(),req.query)
                        .search()

    const vaccins = await apiFeatures.query
    res.status(200).json({
        success: true,
        count:vaccins.length,
        vaccins
    })
}

// get single vaccin details
exports.getSingleVaccin = async(req,res,next) => {
    const vaccin = await Vaccin.findById(req.params.id);

    if(!vaccin){
       return next(new ErrorHandler('Vaccin not found',404))
    }

    res.status(200).json({
        success:true,
        vaccin
    })
}

// update vaccin (only admin)
exports.updateVaccin = async (req,res,next) => {

    let vaccin = await Vaccin.findById(req.params.id);

    if(!vaccin){
        return res.status(404).json({
            success:false,
            message:'Vaccin not found'
        })
    }

    vaccin =  await Vaccin.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        success:true,
        vaccin
    })
}
// delete vaccin (only admin)
exports.deleteVaccin = async (req,res,next) => {

    let vaccin = await Vaccin.findById(req.params.id);

    if(!vaccin){
        return res.status(404).json({
            success:false,
            message:'Vaccin not found'
        })
    }

    await vaccin.remove()
    res.status(200).json({
        success:true,
        message:'Vaccin has been deleted'
    })
}