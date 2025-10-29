const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/authMiddleware')

const dataLabController = require('../controllers/dataLabController')

router.put('/updateDataLab/:idLab', verifyToken, dataLabController.updateDataLab)
router.get('/getDataLab/:idLab', dataLabController.getAllDataLab)
router.post('/addDataLab', verifyToken, dataLabController.addDataLab)
//TODO: Buatkan add barang nya satu-satu jangan langsung masukin ke lab
//TODO: Buatkan terlebih dahulu barangnya nanti biar gampang dimasukkin
//TODO: CRUD Biasa pada umumnya

module.exports = router