const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/authMiddleware')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../public/csv'))
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname}`)
    }
})
const upload = multer({ storage: storage })


const kelasController = require('../controllers/kelasController')

router.get('/', verifyToken, kelasController.getAllKelas)
router.post('/addKelas', verifyToken, kelasController.addKelas)
router.post('/bulkAdd', upload.single('file'), verifyToken, kelasController.addBulk)
router.delete('/deleteKelas/:idKelas', verifyToken, kelasController.deleteKelas)

module.exports = router