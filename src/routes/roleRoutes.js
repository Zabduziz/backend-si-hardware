const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/authMiddleware')

const roleController = require('../controllers/roleController')

router.get('/getRole', verifyToken, roleController.getRole)

module.exports = router