const hoSoTiemChung = require("../models/hoSoTiemChung")
// dvtc: đơn vị tiêm chủng
exports.newHoSoTiemChung = async (req, res) => {
    // user logged in 
    req.body.user = req.user.id;

    const hstc = await hoSoTiemChung.create(req.body);

    res.status(201).json({
        success: true,
        hstc
    })
}
// get all dvtc
exports.getAdminHoSoTiemChung = async (req, res, next) => {


    // const hstcs = await hoSoTiemChung.find();

    // res.status(200).json({
    //     success: true,
    //     count:hstcs.length,
    //     hstcs
    // })

    dangKyTiemChung.find()
        .populate({ path: 'user', select: 'name' })
        .populate({ path: 'vaccin', select: 'tenVaccin' })
        .exec(function (err, list) {
            if (err) return err;
            console.log(list);
            res.status(200).json({
                success: true,
                list
            })
        })
}

exports.getSingleHoSoTiemChung = async (req, res, next) => {
    const hstc = await hoSoTiemChung.findById(req.params.id);

    if (!hstc) {
        return next(new ErrorHandler('Không tìm thấy đơn vị tiêm chủng', 404))
    }

    res.status(200).json({
        success: true,
        hstc
    })
}

exports.updateHoSoTiemChung = async (req, res, next) => {

    let hstc = await hoSoTiemChung.findById(req.params.id);

    if (!hstc) {
        return res.status(404).json({
            success: false,
            message: 'dvtc not found'
        })
    }

    hstc = await hoSoTiemChung.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        hstc
    })
}

