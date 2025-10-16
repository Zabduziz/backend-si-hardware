const { dataLabModel, barangModel } = require('../models')
const { Op } = require('sequelize')
const { generateId } = require('../helper/idGenerator')

const updateDataLab = async (req, res) => {
    const idLab = req.params.idLab
    const dataToUpdate = req.body
    if (req.user.idRole !== 'ADM') { return res.status(403).send({ message: "You are not authorized" }) }
    if (!idLab) {
        return res.status(400).json({ message: "Please insert idLab in the parameter!" })
    }
    if (!dataToUpdate || !Array.isArray(dataToUpdate) || dataToUpdate.length === 0) {
        return res.status(400).json({ message: 'Body request harus berupa array data.' })
    }
    try {
        const updatePromises = dataToUpdate.map(async (item) => {
            const { idBarang, jumlahNormal, jumlahRusak } = item

            if (!idBarang) { throw new Error('idBarang tidak boleh kosong')}

            const [affectedRows] = await dataLabModel.update(
                {
                    jumlahNormal,
                    jumlahRusak
                },
                {
                    where: {
                        idLab: idLab,
                        idBarang: idBarang
                    }
                }
            )
            return affectedRows
        })

        const results = await Promise.all(updatePromises)
        res.status(200).json({ message: "Successfully updated data" })
    } catch (e) {
        console.error(e.message)
        return res.status(500).json({ message: e.message })
    }
}

const getAllDataLab = async (req, res) => {
    const { idLab } = req.params
    if (!idLab) { return res.status(400).send({ message: "Please insert idLab in the field!" }) }
    try {
        const listAllDataLab = await dataLabModel.findAll({
            where: {idLab: idLab},
            attributes: ['idBarang','jumlahNormal', 'jumlahRusak'],
            include: [{
                model: barangModel,
                attributes: ['namaBarang']
            }],
            order: [['idDataLab', 'ASC']]
        })
        res.status(200).json({ message: "Get all data successfully!", data: listAllDataLab })
    } catch (e) {
        console.error(e.message)
        res.status(500).json({ message: e.message })
    }
}

const addDataLab = async (req, res) => {
    const idRole = req.user.idRole
    if (idRole !== 'ADM') { return res.status(403).json({ message: "You are not authorized!" }) }
    const namaBarang = req.body.namaBarang
    try {
        const newBarang = await barangModel.create({
            idBarang: await generateId(barangModel, 'idBarang', 'BRNG'),
            namaBarang: namaBarang
        })
        const addBarang1 = await dataLabModel.create({
            idDataLab: await generateId(dataLabModel, 'idDataLab', 'DL'),
            idLab: 'LAB00001',
            idBarang: newBarang.idBarang,
            jumlahNormal: 0,
            jumlahRusak: 0
        })
        const addBarang2 = await dataLabModel.create({
            idDataLab: await generateId(dataLabModel, 'idDataLab', 'DL'),
            idLab: 'LAB00002',
            idBarang: newBarang.idBarang,
            jumlahNormal: 0,
            jumlahRusak: 0
        })
        res.status(200).json({ message: "Successfully add barang!" })
    } catch (e) {
        console.error(e.message)
        res.status(500).json({ message: e.message })
    }
}

module.exports = {
    updateDataLab,
    getAllDataLab,
    addDataLab
}