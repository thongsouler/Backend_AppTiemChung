const express = require('express');
const { newThongBaoTiem, ThongBaoDanhSachTiem } = require('../controller/thongBaoLichTiemController');
const router = express.Router();
const {isAuthenticatedUser,authorizeRoles} = require("../middleware/auth")

router.route('/admin/thongbaolichtiem').post(isAuthenticatedUser,newThongBaoTiem)
router.route('/admin/thongbaodanhsachlichtiem').get(isAuthenticatedUser,ThongBaoDanhSachTiem)

module.exports = router;