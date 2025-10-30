const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/authMiddleware')

const kelasController = require('../controllers/kelasController')

router.get('/', verifyToken, kelasController.getAllKelas)
router.post('/addKelas', verifyToken, kelasController.addKelas)
router.delete('/deleteKelas/:idKelas', verifyToken, kelasController.deleteKelas)

module.exports = router