const express = require('express');
const { newDonViTiemChung,getAdminDonViTiemChung,getSingleDonViTiemChung,updateDonViTiemChung, deleteDonViTiemChung, getAllDonViTiemChung } = require('../controller/donViTiemChungController');
const router = express.Router();
const {isAuthenticatedUser,authorizeRoles} = require("../middleware/auth")


router.route('/admin/donvitiemchung/new').post(isAuthenticatedUser,authorizeRoles('admin','Đơn vị tiêm chủng'),newDonViTiemChung)
router.route('/admin/donvitiemchung').get(getAdminDonViTiemChung)
router.route('/donvitiemchung').get(getAllDonViTiemChung)
router.route('/donvitiemchung/:id').get(isAuthenticatedUser,authorizeRoles('admin','Đơn vị tiêm chủng'),getSingleDonViTiemChung)
router.route('/admin/donvitiemchung/:id').put(isAuthenticatedUser,authorizeRoles('admin','Đơn vị tiêm chủng'),updateDonViTiemChung)
                                 .delete(isAuthenticatedUser,authorizeRoles('admin','Đơn vị tiêm chủng'),deleteDonViTiemChung)
module.exports = router;