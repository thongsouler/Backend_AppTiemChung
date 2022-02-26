const express = require('express');
const { getVaccins,newVaccin,getSingleVaccin,updateVaccin,deleteVaccin,getAdminVaccins } = require('../controller/vaccinController');
const router = express.Router();
const {isAuthenticatedUser,authorizeRoles} = require("../middleware/auth")


router.route('/vaccins').get(getVaccins)
router.route('/admin/vaccins').get(getAdminVaccins)
router.route('/vaccin/:id').get(getSingleVaccin)
router.route('/admin/vaccin/new').post(isAuthenticatedUser,authorizeRoles('admin'),newVaccin)
router.route('/admin/vaccin/:id').put(isAuthenticatedUser,authorizeRoles('admin'),updateVaccin)
                                 .delete(isAuthenticatedUser,authorizeRoles('admin'),deleteVaccin)
module.exports = router;