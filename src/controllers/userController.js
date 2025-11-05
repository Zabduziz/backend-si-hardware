require('dotenv').config()
const { userModel } = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const sequelize = require('sequelize')
const { generateId } = require('../helper/idGenerator')

const SECRET_KEY = process.env.SECRET_KEY_TOKEN

// REGISTER
const register = async(req, res) => {
    const { email, nama, nim, password } = req.body
    if (!password) { return res.status(400).send({ error: 'Password is required' }) }
    if (password.length < 8) {
        return res.status(400).json({ message: "Password must at least 8 characters!" })
    }
    const numberRegex = /[0-9]+/
    if (!numberRegex.test(password)) {
        return res.status(400).json({ message: "Password must at least 1 number!" })
    }
    const upperCaseRegex = /[A-Z]+/
    if (!upperCaseRegex.test(password)) {
        return res.status(400).json({ message: "Password must at least 1 Capital character!" })
    }

    if (!email) { return res.status(400).json({message:"Please input the Email!"}) }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Email format is not valid!" })
    }

    if (!nama) { return res.status(400).json({message:"Please input your name!"}) }
    if (!nim) { return res.status(400).json({message:"Please input your NIM!"}) }
    if (isNaN(nim)) {
        return res.status(400).json({ message: "NIM must be a number!" });
    }
    if (nim.length !== 8) {
        return res.status(400).json({ message: "NIM must be exactly 8 characters long!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    try {
        const existingUser = await userModel.findOne({
            where: { email: email}
        })
        if (existingUser) {
            return res.status(409).json({ message: "Email already exists! Please use another email!" })
        }

        const newidUser = await generateId(userModel, 'idUser', 'USR')
        const user = await userModel.create({
            idUser: newidUser,
            idRole: 'AST',
            email: email,
            nama: nama,
            nim: nim,
            password: hashedPassword
        })

        res.status(201).json({message: "User created successfully.", data: user})
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: e.message })
    }
}

// LOGIN
const login = async(req, res) => {
    const { nim, password } = req.body
    if (!nim || !password) { return res.status(400).json({ message: "Please insert value in the field!" }) }
    if (isNaN(nim)) {
        return res.status(400).json({ message: "NIM must be a number!" });
    }
    if (nim.length !== 8) {
        return res.status(400).json({ message: "NIM must be exactly 8 characters long!" });
    }
    try {
        const user = await userModel.findOne({
            where: { nim: nim }
        })
        if (!user) { return res.status(404).json({ message: "User not found!" }) }
        const statusUser = user.isActive
        if (statusUser === false) { return res.status(403).json({ message: "This account does not activated yet!" }) }

        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) return res.status(401).json({ message: "Wrong Password!" })

        const payload = {
            idUser: user.idUser,
            idRole: user.idRole,
            nama: user.nama
        }

        const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '2h'})
        res.status(200).json({ message:"Login Successfully!", token: token})
    } catch (e) {
        console.error(e.message)
        res.status(500).json({ message: e.message })
    }
}

// UPDATE STATUS FOR USER
const updateStatus = async (req, res) => {
    const idUser = req.params.idUser
    if (!idUser) { return res.status(400).json({ message: "Please insert value in the field!" }) }
    const role = req.user.idRole
    if (role !== 'ADM') { return res.status(403).json({ message: "You are not Admin!" }) }
    try {
        const user = await userModel.findOne({
            where: { idUser: idUser }
        })
        if (!user) { return res.status(404).json({ message: "User not found!" }) }
        if (user.isActive === false) {
            user.isActive = true
        }
        await user.save()
        res.status(200).json({ message: `User ${user.idUser} successfully updated!` })
    } catch (e) {
        console.error(e.message)
        res.status(500).json({ message: e.message })
    }
}

const getAllUsers = async(req, res) => {
    const role = req.user.idRole
    if (role !== 'ADM') { return res.status(403).json({ message: "You are not Admin!" }) }
    try {
        const allUsers = await userModel.findAll({
            attributes: ['idUser', 'idRole', 'email', 'nama', 'nim', 'isActive']
        })
        res.status(200).json({
            message: 'Successfully get all users',
            data: allUsers
        })
    } catch (e) {
        console.error(e.message)
        res.status(500).json({ message: e.message })
    }
}

const getInfo = async(req, res) => {
    const idUser = req.user.idUser
    try {
        const info = await userModel.findOne({
            where: {
                idUser: idUser
            },
            attributes: ['nim', 'nama', 'idRole', 'email']
        })
        res.status(200).json({
            message: 'Successfully get info account',
            data: info
        })
    } catch (e) {
        console.error(e.message)
        res.status(500).json({ message: e.message })
    }
}

module.exports = {
    register,
    login,
    updateStatus,
    getAllUsers,
    getInfo
}