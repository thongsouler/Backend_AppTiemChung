const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const dangKyTiemChung = require("../models/dangKyTiemChung");
const User = require("../models/User");
const ErrorHandler = require("../utils/errorHandler");

// dktc: đăng ký tiêm chủng
exports.newdktc = catchAsyncErrors(async (req, res) => {
    // user logged in 
    req.body.user = req.user.id;

    const newdktc = await dangKyTiemChung.create(req.body);
    const dktc = await dangKyTiemChung.populate(newdktc, [{
        path: 'vaccin', select: 'tenVaccin'
    }, { path: 'dvtc' }]);
    res.status(201).json({
        success: true,
        dktc,

    })

})


// lấy id của hồ sơ đăng ký
exports.hoSoTiemdetails = catchAsyncErrors(async (req, res) => {
    const danhsach = dangKyTiemChung.findById(req.params.id)
        .populate({ path: 'user' })
        .populate({ path: 'vaccin' })
        .populate({ path: 'dvtc' })
        .exec((err, hoso) => {
            if (err) return (err);
            console.log(hoso);
            res.status(200).json({
                success: true,
                hoso
            })
        })

})
// update hồ sơ tiêm cá nhân

exports.updateHoSoTiemCaNhan = async (req, res, next) => {

    let injectionList = await dangKyTiemChung.findById(req.params.id);

    if (!injectionList) {
        return res.status(404).json({
            success: false,
            message: 'Injection List not found'
        })
    }

    injectionList = await dangKyTiemChung.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        injectionList
    })
}

exports.deleteHoSoTiemCaNhan = async (req, res, next) => {

    let injectionList = await dangKyTiemChung.findById(req.params.id);

    if (!injectionList) {
        return res.status(404).json({
            success: false,
            message: 'injection list not found'
        })
    }

    await injectionList.remove()
    res.status(200).json({
        success: true,
        message: 'injection list has been deleted'
    })
}
// lấy id của người dân đăng ký tiêm
exports.hoSoTiemCaNhan = catchAsyncErrors(async (req, res, next) => {
    const danhsach = dangKyTiemChung.find({ user: req.params.id })
        .populate({ path: 'vaccin' })
        .populate({ path: 'dvtc' })
        .populate({ path: 'user' })
        .exec((err, hoso) => {
            if (err) return (err);
            // console.log(hoso);

            res.status(200).json({
                success: true,
                hoso
            })
        })

})
exports.DanhSachTiem = async (req, res) => {
    dangKyTiemChung.find()
        .populate({ path: 'user' })
        .populate({ path: 'vaccin', select: 'tenVaccin' })
        .populate({ path: 'dvtc', select: 'dvtc' })
        .exec(function (err, list) {
            if (err) return err;
            console.log(list);
            res.status(200).json({
                success: true,
                list,

            })
        })

}


// lấy toàn bộ hồ sơ tiêm chủng
exports.allHoSoTiemChung = async (req, res, next) => {
    const hstcs = await dangKyTiemChung.find();


    res.status(200).json({
        success: true,
        hstcs
    })
}

// lấy 1 id của hồ sơ tiêm chủng
exports.hoSoTiemChung = catchAsyncErrors(async (req, res, next) => {


    const hoSoTiemChung = await dangKyTiemChung.findById(req.params.id);
    // const hoSoTiemChung = await dangKyTiemChung.find({"_id":ObjectId('61532b6dd5dfde0331cee686')});
    if (!hoSoTiemChung) {
        res.status(404).json({
            msg: 'Hồ sơ tiêm chủng không tìm thấy'
        })
    }

    res.status(200).json({
        success: true,
        hoSoTiemChung
    })
})
exports.newtienSuBenh = async (req, res) => {
    // user logged in 
    req.body.user = req.user.id;

    const tiensuBenh = await tienSuBenh.create(req.body);

    res.status(201).json({
        success: true,
        tiensuBenh
    })
}

exports.getAllAfterSorting = async (req, res) => {
    const all = await dangKyTiemChung.find(); // => [ {} , {}]
    // console.log({ all })
    // console.log(all[0].nhomUuTien[0]);
    const result = sortByPriorityAndDate(all);
    res.json({
        result
    })
}



function sortByPriorityAndDate(arr) {
    let newArr = arr.filter(e => e.status == "Chưa xử lý");    
    console.log(newArr); 
    newArr = newArr.sort(( a, b ) =>  a.createdAt - b.createdAt); 
    
    // sorting theo doi tuong uu tien 
    newArr = newArr.sort(( a, b ) =>  parseInt(a.nhomUuTien[0]) - parseInt(b.nhomUuTien[0]))
    // console.log(newArr);
    return newArr;
    
}

exports.getDKTCByUserID= async(req,res) => {
    const all = await dangKyTiemChung.find(); // => [ {} , {}]
    const dondangky = all.find( o => o.user == '61532b97d5dfde0331cee69')
    console.log(dondangky);

    res.json({
        dondangky
    })
}
