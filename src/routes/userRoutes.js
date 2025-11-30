const { userModel } = require('../models')
const bcrypt = require("bcryptjs")
const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/authMiddleware')

const userController = require('../controllers/userController')

router.post('/register', userController.register)
router.post('/login', userController.login)

router.get('/getAllUser', verifyToken, userController.getAllUsers)
router.put('/changeStatus/:idUser', verifyToken, userController.updateStatus)
router.get('/infoProfile', verifyToken, userController.getInfo)

router.post('/resetPassword', verifyToken, async (req, res) => {
    const idRole = req.user.idRole
    if (idRole !== 'ADM') { return res.status(403).json({ message: "You are not Admin!" }) }
    try {
        const { nim, newPassword } = req.body
        if (!nim || !newPassword) { return res.status(400).json({ message: "Please insert value in the field!" }) }
        if (newPassword.length < 8) {
            return res.status(400).json({ message: "Password must at least 8 characters!" });
        }
        const user = await userModel.findOne({
            where: { nim: nim }
        })
        if (!user) { return res.status(404).json({ message: "User not found!" }) }
        const hashedPassword = await bcrypt.hash(newPassword, 10)
        user.password = hashedPassword
        await user.save()
        res.status(200).json({ message: `User dengan nim ${user.nim} successfully updated!` })
    } catch (e) {
        console.error(e.message)
        res.status(500).json({ message: e.message })
    }
})

module.exports = router