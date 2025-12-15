const { dataLabModel, historyKegiatanModel, historyDetailModel, barangModel, userModel, dosenModel, kelasModel, sequelize, tipePraktikumModel } = require('../models')
const { generateId } = require('../helper/idGenerator')
const path = require('path')

const addPraktikumData = async (req, res) => {
    const idUser = req.user.idUser
    const file = req.file
    const { idPraktikum, idLab } = req.params
    const { tanggal, idDosen, tindakLanjut, waktu, idKelas } = req.body
    const photoPraktikum = file ? `uploads/${file.filename}` : null
    if (!idPraktikum || !idLab || !tanggal || !idDosen) {
        return res.status(400).send('Please put the valid parameter')
    }
    let detailAlat = req.body.dataAlat
    if (typeof detailAlat === 'string') {
        try {
            detailAlat = JSON.parse(detailAlat)
        } catch (e) {
            return res.status(400).json({ message: "Format detailAlat tidak valid." })
        }
    }
    if (!detailAlat || !Array.isArray(detailAlat) || detailAlat.length === 0) {
        return res.status(400).json({ message: "Jumlah detailAlat tidak valid." })
    }

    const t = await sequelize.transaction()
    try {
        const historyKegiatan = await historyKegiatanModel.create({
            idUser: idUser,
            idPraktikum: idPraktikum,
            idLab: idLab,
            idDosen: idDosen,
            idKelas: idKelas,
            tanggal: tanggal,
            waktu: waktu,
            tindakLanjut: tindakLanjut,
            ttd: photoPraktikum
        }, { transaction: t })

        const alatList = []
        for (const detail of detailAlat) {
            const dataLab = await dataLabModel.findOne({
                where: { idBarang: detail.idBarang, idLab: idLab }
            })
            const jumlahAwal = dataLab.jumlahNormal
            const jumlahRusak = jumlahAwal - detail.jumlahAkhir
            const historyDetail = await historyDetailModel.create({
                idHistory: historyKegiatan.idHistory,
                idDataLab: dataLab.idDataLab,
                jumlahAwal: jumlahAwal,
                jumlahAkhir: detail.jumlahAkhir,
                jumlahRusak: jumlahRusak,
            }, { transaction: t })
            await dataLabModel.update(
                {
                    jumlahNormal: dataLab.jumlahNormal - jumlahRusak,
                    jumlahRusak: dataLab.jumlahRusak + jumlahRusak,
                },
                {
                    where: {
                        idBarang: detail.idBarang,
                        idLab: idLab,
                    }
                },
                { transaction: t }
            )
            alatList.push(historyDetail)
        }
        await t.commit()

        res.status(200).json({
            message: 'Successfully added history',
            history: historyKegiatan,
            historyDetail: alatList
        })
    } catch (e) {
        console.error(e.message)
        res.status(500).json({ error: e.message })
    }
}

const getPraktikum = async (req, res) => {
    const idPraktikum = req.params.idPraktikum
    if (!idPraktikum) {
        return res.status(400).json({ message: "Please put idPraktikum!" })
    }
    try {
        const allHistories = await historyKegiatanModel.findAll({
            where: { idPraktikum: idPraktikum },
            include: [{
                model: userModel,
                attributes: ['nama']
            },
            {
                model: dosenModel,
                attributes: ['namaDosen']
            },
            {
                model: kelasModel,
                attributes: ['namaKelas']
            }
            ]
        })
        if (allHistories.length === 0) {
            return res.status(404).json({ message: "No histories found." })
        }

        const baseUrl = `${req.protocol}://${req.get('host')}`
        const formattedHistory = allHistories.map(history => {
            return {
                ...history.toJSON(),
                ttd: `${baseUrl}/${history.ttd.replace(/\\/g, '/').replace('public/', '')}`
            }
        })

        res.status(200).json({
            message: 'Histories successfully get!',
            data: formattedHistory
        })
    } catch (e) {
        console.error(e.message)
        res.status(500).json({ error: e.message })
    }
}

const getDetailHistory = async (req, res) => {
    const idHistory = req.params.idHistory
    if (!idHistory) { return res.status(400).json({ message: "Please put idHistory!" }) }
    try {
        const allDetail = await historyDetailModel.findAll({
            where: { idHistory: idHistory },
            include: [
                {
                    model: dataLabModel,
                    attributes: ['idDataLab'],
                    include: [
                        {
                            model: barangModel,
                            attributes: ['namaBarang']
                        }
                    ]
                }
            ],
            attributes: ['idHistory', 'jumlahAwal', 'jumlahAkhir', 'jumlahRusak'],
        })
        res.status(200).json({
            message: 'Histories successfully get!',
            data: allDetail
        })
    } catch (e) {
        console.error(e.message)
        res.status(500).json({ error: e.message })
    }
}

const addTipePraktikum = async(req, res) => {
    const idRole = req.user.idRole
    const namaPraktikum = req.body.namaPraktikum
    if (idRole !== "ADM") {
        return res.status(403).json({ message: "You are not authorized" })
    }
    try {
        if(!namaPraktikum) {return res.status(400).json({ message: "Please input praktikum name!" })}
        const checkPraktikumName = await tipePraktikumModel.findOne({
            where: { namaPraktikum: namaPraktikum }
        })
        if (checkPraktikumName) {return res.status(400).json({ message: "Praktikum name already exists" })}
        const newPraktikum = await tipePraktikumModel.create({
            idPraktikum: await generateId(tipePraktikumModel, 'idPraktikum', 'PRTK'),
            namaPraktikum: namaPraktikum
        })
        res.status(200).json({
            message: "Successfully created praktikum! ",
            data: newPraktikum
        })
    } catch (e) {
        console.error(e.message)
        res.status(500).json({ message: e.message })
    }
}

module.exports = {
    addPraktikumData,
    getPraktikum,
    getDetailHistory,
    addTipePraktikum
}