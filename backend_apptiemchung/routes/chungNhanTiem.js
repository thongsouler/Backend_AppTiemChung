const express = require('express');
const { chungNhanTiemCaNhan, ChungNhanTiem } = require('../controller/chungNhanTiemController');
const { newThongBaoTiem, ThongBaoDanhSachTiem } = require('../controller/thongBaoLichTiemController');
const router = express.Router();
const {isAuthenticatedUser,authorizeRoles} = require("../middleware/auth")

// router.route('/admin/allchungnhantiem').post(isAuthenticatedUser,newThongBaoTiem)
router.route('/admin/allchungnhantiem').get(isAuthenticatedUser,authorizeRoles('admin'),ChungNhanTiem)
router.route('/admin/chungnhantiemcanhan/:id').get(isAuthenticatedUser,chungNhanTiemCaNhan)

module.exports = router;