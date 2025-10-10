const { dataLabModel } = require('../models')
const { Op } = require('sequelize')

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
    if (req.user.idRole !== 'ADM') { return res.status(403).send({ message: "You are not authorized!" }) }
    if (!idLab) { return res.status(400).send({ message: "Please insert idLab in the field!" }) }
    try {
        const listAllDataLab = await dataLabModel.findAll({
            where: {idLab: idLab},
            attributes: ['idDataLab', 'jumlahNormal', 'jumlahRusak']
        })
        res.status(200).json({ message: "Get all data successfully!", data: listAllDataLab })
    } catch (e) {
        console.error(e.message)
        res.status(500).json({ message: e.message })
    }
}

module.exports = {
    updateDataLab,
    getAllDataLab,
}