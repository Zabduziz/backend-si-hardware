const { dosenModel } = require('../models')
const { generateId } = require('../helper/idGenerator')

const addDosen = async (req, res) => {
    const idRole = req.user.idRole
    if (idRole !== 'ADM') { return res.status(403).json({ message: "You are not authorized" }) }
    const namaDosen = req.body.namaDosen
    if (!namaDosen) { return res.status(400).json({ message: "please input dosen name!" }) }
    try {
        const checkDosenName = await dosenModel.findOne({
            where: { namaDosen: namaDosen }
        })
        if (checkDosenName) {return res.status(400).json({ message: "Dosen name already exists" }) }
        const newDosen = await dosenModel.create({
            idDosen: await generateId(dosenModel, 'idDosen', 'DSN'),
            namaDosen: namaDosen
        })
        res.status(200).json({
            message: "Successfully created dosen",
            data: newDosen
        })
    } catch (e) {
        console.error(e.message)
        res.status(500).json({ message: e.message })
    }
}

const deleteDosen = async (req, res) => {
    const idRole = req.user.idRole
    if (idRole !== 'ADM') { return res.status(403).json({ message: "You are not authorized" }) }
    const idDosen = req.params.idDosen
    if (!idDosen) { return res.status(400).json({ message: "please input id dosen!" }) }
    try {
        const deleteDosen = await dosenModel.destroy({
            where: { idDosen: idDosen }
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

const getAllDosen = async (req, res) => {
    try {
        const allDosen = await dosenModel.findAll()
        res.status(200).json({
            message: "Successfully get All Dosen",
            data: allDosen
        })
    } catch (e) {
        console.error(e.message)
        res.status(500).json({ message: e.message })
    }
}

module.exports = {
    addDosen,
    deleteDosen,
    getAllDosen
}