const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/authMiddleware')

const kelasDosenController = require('../controllers/kelasDosenController')

router.get('/', verifyToken, kelasDosenController.getAllKelasDosen)
router.get('/getKelas', kelasDosenController.getKelas)
router.post('/addKelasDosen', verifyToken, kelasDosenController.addKelasDosen)
router.delete('/deleteKelasDosen/:id', verifyToken, kelasDosenController.deleteKelasDosen)

module.exports = router