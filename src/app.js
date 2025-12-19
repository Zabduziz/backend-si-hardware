const helmet = require('helmet')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

const app = express()
const port = 3000

require('dotenv').config({
    path: "../.env"
})

const userRoutes = require('./routes/userRoutes')
const roleRoutes = require('./routes/roleRoutes')
const dataLabRoutes = require('./routes/dataLabRoutes')
const praktikumRoutes = require('./routes/praktikumRoutes')
const dosenRoutes = require('./routes/dosenRoutes')
const kelasRoutes = require('./routes/kelasRoutes')
const kelasDosenRoutes = require('./routes/kelasDosenRoutes')
const barangRoutes = require('./routes/barangRoutes')
const ruangLabRoutes = require('./routes/ruangLabRoutes')

app.use(cors())
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '..', 'public')))
app.use(helmet())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// USER
app.use('/auth', userRoutes)

// ROLE
app.use('/role', roleRoutes)

// BARANG
app.use('/barang', barangRoutes)

// LAB
app.use('/ruangLab', ruangLabRoutes)

// DATALAB
app.use('/datalab', dataLabRoutes)

// ACTIVITY FOR ASSISTANT
app.use('/praktikum', praktikumRoutes)

// DOSEN
app.use('/dosen', dosenRoutes)

// KELAS
app.use('/kelas', kelasRoutes)

// DOSEN & KELAS
app.use('/dosenKelas', kelasDosenRoutes)

// HEALTH CHECK
app.get('/health', async (req, res) => {
    res.json({
        status: "OK",
        timestamp: Date.now(),
        uptime: process.uptime()
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})