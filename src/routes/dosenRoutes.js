const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/authMiddleware')

const dosenController = require('../controllers/dosenController')

router.get('/', dosenController.getAllDosen)
router.post('/addDosen', verifyToken, dosenController.addDosen)
router.delete('/deleteDosen/:idDosen', verifyToken, dosenController.deleteDosen)

module.exports = router