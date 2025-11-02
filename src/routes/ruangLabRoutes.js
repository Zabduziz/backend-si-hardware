const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/authMiddleware')

const ruangLabController = require('../controllers/ruangLabController')

router.get('/', ruangLabController.getAllLab)
router.post('/addLab', verifyToken, ruangLabController.addLab)
router.delete('/deleteLab/:id', verifyToken, ruangLabController.deleteLab)

module.exports = router