const { kelasModel } = require('../models')
const { generateId } = require('../helper/idGenerator')

const addKelas = async (req, res) => {
    const idRole = req.user.idRole
    if (idRole !== 'ADM') { return res.status(403).json({ message: "You are not authorized" }) }
    const namaKelas = req.body.namaKelas
    if (!namaKelas) { return res.status(400).json({ message: "please input kelas name!" }) }
    try {
        const checkKelasName = await kelasModel.findOne({
            where: { namaKelas: namaKelas }
        })
        if (checkKelasName) {return res.status(400).json({ message: "Kelas name already exists" }) }
        const newKelas = await kelasModel.create({
            idKelas: await generateId(kelasModel, 'idKelas', 'KLS'),
            namaKelas: namaKelas
        })
        res.status(200).json({
            message: "Successfully created kelas!",
            data: newKelas
        })
    } catch (e) {
        console.error(e.message)
        res.status(500).json({ message: e.message })
    }
}

const deleteKelas = async (req, res) => {
    const idRole = req.user.idRole
    if (idRole !== 'ADM') { return res.status(403).json({ message: "You are not authorized" }) }
    const idKelas = req.params.idKelas
    if (!idKelas) { return res.status(400).json({ message: "please input id kelas!" }) }
    try {
        const deleteDosen = await kelasModel.destroy({
            where: { idKelas: idKelas }
        })
        res.status(200).json({
            message: "Successfully deleted dosen!",
            data: deleteDosen
        })
    } catch (e) {
        console.error(e.message)
        res.status(500).json({ message: e.message })
    }
}

const getAllKelas = async (req, res) => {
    const idRole = req.user.idRole
    if (idRole !== 'ADM') { return res.status(403).json({ message: "You are not authorized" }) }
    try {
        const allKelas = await kelasModel.findAll()
        res.status(200).json({
            message: "Successfully get All Dosen",
            data: allKelas
        })
    } catch (e) {
        console.error(e.message)
        res.status(500).json({ message: e.message })
    }
}

module.exports = {
    addKelas,
    deleteKelas,
    getAllKelas
}