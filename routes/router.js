const express = require('express')
const router = express.Router();
const controller = require('../controller/controller')

router.get('/search', controller.search)
router.get('/top', controller.top)
router.get('/get/:id', controller.get)
router.get('/news', controller.gnews)
router.get('/news/:id', controller.news)

module.exports = router