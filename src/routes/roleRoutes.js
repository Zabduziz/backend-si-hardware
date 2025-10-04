const express = require('express')
const router = express.Router()

const roleController = require('../controllers/roleController')

router.get('/getRole', roleController.getRole)

module.exports = router