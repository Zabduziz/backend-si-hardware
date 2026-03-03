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

const dosenController = require('../controllers/dosenController')

router.get('/', dosenController.getAllDosen)
router.post('/addDosen', verifyToken, dosenController.addDosen)
router.post('/bulkAdd', upload.single('file'), verifyToken, dosenController.addBulkDosen)
router.delete('/deleteDosen/:idDosen', verifyToken, dosenController.deleteDosen)

module.exports = router