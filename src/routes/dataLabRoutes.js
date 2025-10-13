const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/authMiddleware')

const dataLabController = require('../controllers/dataLabController')

router.put('/updateDataLab/:idLab', verifyToken, dataLabController.updateDataLab)
router.get('/getDataLab/:idLab', dataLabController.getAllDataLab)

module.exports = router