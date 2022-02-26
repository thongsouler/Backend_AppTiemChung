const express = require('express');
const { reportByAge, lastMonth } = require('../controller/reportController');
const router = express.Router();

router.route('/reportbyAge').get(reportByAge)
router.route('/reportbyMonth').get(lastMonth)
module.exports = router;