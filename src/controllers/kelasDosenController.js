const { kelasDosenModel, kelasModel, dosenModel } = require('../models')

const addKelasDosen = async (req, res) => {
    const idRole = req.user.idRole
    if (idRole !== 'ADM') {
        return res.status(403).json({ message: "You are not authorized!" })
    }
    const { idDosen, idKelas, tahunAjar, semester } = req.body
    if (!idDosen || !idKelas || !tahunAjar || !semester) { return res.status(400).json({ message: "Please input id kelas and dosen!" }) }
    try {
        const existingKelasDosen = await kelasDosenModel.findOne({
            where: {
                idKelas: idKelas,
                tahunAjar: tahunAjar,
                semester: semester
            }
        })

        if (existingKelasDosen) {
            return res.status(409).json({ message: "Kelas sudah diambil oleh dosen untuk semester ini!" })
        }

        const tahunSelesai = tahunAjar + 1
        const newKelasDosen = await kelasDosenModel.create({
            idDosen: idDosen,
            idKelas: idKelas,
            tahunAjar: tahunAjar,
            tahunSelesai: tahunSelesai,
            semester: semester
        })
        res.status(200).json({
            message: "Kelas dosen added successfully",
            data: newKelasDosen
        })
    } catch (e) {
        console.error(e.message)
        res.status(500).json({ message: e.message })
    }
}

const deleteKelasDosen = async (req, res) => {
    const id = req.params.id
    const idRole = req.user.idRole
    if (idRole !== 'ADM') {
        return res.status(403).json({ message: "You are not authorized!" })
    }
    try {
        const deleteKelasDosen = await kelasDosenModel.destroy({
            where: { idKelasDosen: id}
        })
        res.status(200).json({
            message: "Kelas deleted successfully",
            data: deleteKelasDosen
        })
    } catch (e) {
        console.error(e.message)
        res.status(500).json({ message: e.message })
    }
}

const getAllKelasDosen = async (req, res) => {
    const idRole = req.user.idRole
    if (idRole !== 'ADM') {
        return res.status(403).json({ message: "You are not authorized!" })
    }
    try {
        const allKelasDosen = await kelasDosenModel.findAll({})
        res.status(200).json({
            message:"Get all data kelas successfully!",
            data: allKelasDosen
        })
    } catch (e) {
        console.error(e.message)
        res.status(500).json({ message: e.message })
    }
}

const getKelas = async (req, res) => {
    const namaDosen = req.query.namaDosen
    if (!namaDosen) {
        return res.status(400).json({ message: "Please input nama dosen!" })
    }
    try {
        const dosen = await dosenModel.findOne({
            where: { namaDosen: namaDosen },
            attributes: ['idDosen']
        })
        if (!dosen) {
            return res.status(404).json({ message: "Dosen not found!" })
        }
        const kelasDosen = await kelasDosenModel.findAll({
            where: { idDosen: dosen.idDosen },
            include: [{
                model: kelasModel,
                attributes: ['idKelas', 'namaKelas']
            }]
        })
        if (kelasDosen.length === 0) {
            return res.status(404).json({ message: "No classes found for this dosen!" })
        }
        const kelas = kelasDosen.map(kd => kd.kelasModel)
        res.status(200).json({
            message: "Get kelas by dosen successfully!",
            data: kelas
        })
    } catch (e) {
        console.error(e.message)
        res.status(500).json({ message: e.message })
    }
}

module.exports = {
    addKelasDosen,
    deleteKelasDosen,
    getAllKelasDosen,
    getKelas
}