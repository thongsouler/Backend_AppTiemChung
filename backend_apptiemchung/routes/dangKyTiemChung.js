const express = require('express');
const {getAllAfterSorting,  newdktc, newtienSuBenh, hoSoTiemChung, allHoSoTiemChung, hoSoTiemdetails, DanhSachTiem, hoSoTiemCaNhan, updateHoSoTiemCaNhan, deleteHoSoTiemCaNhan, getDKTCByUserID } = require('../controller/dangKyTiemChungController');
const { 
    newDonViTiemChung,
    getAdminDonViTiemChung, 
    getSingleDonViTiemChung, 
    updateDonViTiemChung, 
    } = require('../controller/donViTiemChungController');
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth")

router.route("/hihi").get(getAllAfterSorting);
router.route('/dondangky').get(getDKTCByUserID);

router.route('/user/dangkytiemchung/register-person').post(newdktc)
router.route('/user/dangkytiemchung/tien-su-benh').post(isAuthenticatedUser, newtienSuBenh)
router.route('/admin/donvitiemchung').get(getAdminDonViTiemChung)
router.route('/user/hoSoTiemdetails/:id').get(isAuthenticatedUser, hoSoTiemdetails)
router.route('/user/hoSoTiemCaNhan/:id').get(isAuthenticatedUser, hoSoTiemCaNhan)
router.route('/admin/hoSoTiemCaNhan/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateHoSoTiemCaNhan)
router.route('/admin/hoSoTiemCaNhan/:id').delete(isAuthenticatedUser, authorizeRoles('admin'), deleteHoSoTiemCaNhan)
router.route('/admin/alldanhsachtiem').get(DanhSachTiem)
router.route('/admin/hosotiemchung').get(allHoSoTiemChung, authorizeRoles('admin'))
router.route('/user/hosotiemchung/:id').get(isAuthenticatedUser, hoSoTiemChung)
router.route('/donvitiemchung/:id').get(getSingleDonViTiemChung)
router.route('/admin/donvitiemchung/:id').put(isAuthenticatedUser, authorizeRoles('admin'), updateDonViTiemChung)
//                                  .delete(isAuthenticatedUser,authorizeRoles('admin'),deleteVaccin)
module.exports = router;