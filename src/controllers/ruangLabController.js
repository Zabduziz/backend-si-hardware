const { ruangLabModel } = require('../models')
const { generateId } = require('../helper/idGenerator')

const getAllLab = async (req, res) => {
    try {
        const allDataLab = await ruangLabModel.findAll()
        res.status(200).json({
            message: `Successfully retrieved all data lab.`,
            data: allDataLab
        })
    } catch (e) {
        console.error(e.message)
        res.status(500).json({error: e.message})
    }
}

const addLab = async (req, res) => {
    const idRole = req.user.idRole
    const ruanganLab  = req.body.ruanganLab
    if (idRole !== 'ADM') {
        return res.status(403).json({error: 'You are not authorized!'})
    }
    if (!ruanganLab) {
        return res.status(400).json({error: 'Please enter valid ruanganLab!'})
    }
    try {
        const existedRuanganLab = await ruangLabModel.findOne({
            where: {
                ruanganLab: ruanganLab
            }
        })
        if (existedRuanganLab) {
            return res.status(409).json({message:`${ruanganLab} already exists!`})
        }
        const newRuangLab = await ruangLabModel.create({
            idLab: await generateId(ruangLabModel, 'idLab', 'LAB'),
            ruanganLab: ruanganLab
        })
        res.status(200).json({
            message: `Successfully added ruanganLab`,
            data: newRuangLab
        })
    } catch (e) {
        console.error(e.message)
        res.status(500).json({error: e.message})
    }
}

const deleteLab = async (req, res) => {
    const idRole = req.user.idRole
    const idLab  = req.params.id
    if (idRole !== 'ADM') {
        return res.status(403).json({error: 'You are not authorized!'})
    }
    if (!idLab) {
        return res.status(400).json({error: 'Please enter valid idLab!'})
    }
    try {
        const deletedLab = await ruangLabModel.destroy({
            where: {
                idLab: idLab
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${idLab}.`,
        })
    } catch (e) {
        console.error(e.message)
        res.status(500).json({error: e.message})
    }
}

module.exports = {
    getAllLab,
    addLab,
    deleteLab,
}