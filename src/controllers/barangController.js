const { barangModel } = require('../models')
const { generateId } = require('../helper/idGenerator')

const getAllBarang = async (req, res) => {
    try {
        const allBarang = await barangModel.findAll({
            attributes: ['idBarang', 'namaBarang', 'deskripsiBarang']
        })
        res.status(200).json({
            message: "Successfully get All barang!",
            data: allBarang
        })
    } catch (e) {
        console.error(e.message)
        res.status(500).json({ error: e.message })
    }
}

const addBarang = async (req, res) => {
    const idRole = req.user.idRole
    const { namaBarang, deskripsi } = req.body
    if (idRole !== 'ADM') {
        res.status(403).json({ message: "You are not authorized to addBarang!" })
    }
    if (!namaBarang) {
        res.status(400).json({ message: "Please enter a nama barang!" })
    }
    try {
        const existedBarang = await barangModel.findOne({
            where: {
                namaBarang: namaBarang
            }
        })
        if (existedBarang) {
            res.status(409).json({ message: `Barang ${namaBarang} sudah ada! harap isi yang lain!` })
        }
        const newBarang = await barangModel.create({
            idBarang: await generateId(barangModel, 'idBarang', 'BRNG'),
            namaBarang: namaBarang,
            deskripsiBarang: deskripsi
        })
        res.status(200).json({
            message: "Successfully created barang!",
            data: newBarang
        })
    } catch (e) {
        console.error(e.message)
        res.status(500).json({ error: e.message })
    }
}

const deleteBarang = async (req, res) => {
    const idRole = req.user.idRole
    const idBarang = req.params.id
    if (idRole !== 'ADM') {
        res.status(403).json({ message: "You are not authorized to addBarang!" })
    }
    if (!idBarang) {
        res.status(400).json({ message: "Please enter a id barang!" })
    }
    try {
        const deletedBarang = await barangModel.destroy({
            where: {
                idBarang: idBarang
            }
        })
        res.status(200).json({ message: `Barang ${idBarang} deleted!` })
    } catch (e) {
        console.error(e.message)
        res.status(500).json({ error: e.message })
    }
}

module.exports = {
    getAllBarang,
    addBarang,
    deleteBarang
}