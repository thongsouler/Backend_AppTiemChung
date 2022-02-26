const express = require('express');
const { newHoSoTiemChung,getAdminHoSoTiemChung,getSingleHoSoTiemChung,updateHoSoTiemChung } = require('../controller/hstcController');
const router = express.Router();
const {isAuthenticatedUser,authorizeRoles} = require("../middleware/auth")


// router.route('/admin/hosotiemchung/new').post(isAuthenticatedUser,authorizeRoles('admin'),newHoSoTiemChung)
// router.route('/admin/hosotiemchung').get(getAdminHoSoTiemChung)
// router.route('/hosotiemchung/:id').get(getSingleHoSoTiemChung)
// router.route('/admin/hosotiemchung/:id').put(isAuthenticatedUser,authorizeRoles('admin'),updateHoSoTiemChung)
//                                  .delete(isAuthenticatedUser,authorizeRoles('admin'),deleteVaccin)
module.exports = router;