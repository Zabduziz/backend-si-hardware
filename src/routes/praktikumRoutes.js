const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const verifyToken = require('../middleware/authMiddleware')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/uploads'))
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`)
    }
})
const upload = multer({ storage: storage })

const praktikumController = require('../controllers/praktikumController')

router.post('/addTipePraktikum', verifyToken, praktikumController.addTipePraktikum)
router.post(
    '/addPraktikum/:idLab/:idPraktikum',
    upload.single('photoPraktikum'),
    verifyToken,
    praktikumController.addPraktikumData
)

router.get('/getPraktikumHistory/:idPraktikum', praktikumController.getPraktikum)
router.get('/getDetailHistory/:idHistory', praktikumController.getDetailHistory)

module.exports = router