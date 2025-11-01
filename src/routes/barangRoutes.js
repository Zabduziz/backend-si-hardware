const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/authMiddleware')

const barangController = require('../controllers/barangController')

router.get('/', barangController.getAllBarang)
router.post('/addBarang', verifyToken, barangController.addBarang)
router.delete('/deleteBarang/:id', verifyToken, barangController.deleteBarang)

module.exports = router