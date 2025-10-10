const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/authMiddleware')

const userController = require('../controllers/userController')

router.post('/register', userController.register)
router.post('/login', userController.login)

router.put('/changeStatus/:idUser', verifyToken, userController.updateStatus)

module.exports = router