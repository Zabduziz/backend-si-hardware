const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/authMiddleware')

const userController = require('../controllers/userController')

router.post('/register', userController.register)
router.post('/login', userController.login)

router.get('/getAllUser', verifyToken, userController.getAllUsers)
router.put('/changeStatus/:idUser', verifyToken, userController.updateStatus)
router.get('/infoProfile', verifyToken, userController.getInfo)

module.exports = router