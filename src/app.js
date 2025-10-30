const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

const app = express()
const port = 3000


const userRoutes = require('./routes/userRoutes')
const roleRoutes = require('./routes/roleRoutes')
const dataLabRoutes = require('./routes/dataLabRoutes')
const praktikumRoutes = require('./routes/praktikumRoutes')
const dosenRoutes = require('./routes/dosenRoutes')
const kelasRoutes = require('./routes/kelasRoutes')

app.use(cors())
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '..', 'public')))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// USER
app.use('/auth', userRoutes)

// ROLE
app.use('/role', roleRoutes)

// DATALAB
app.use('/datalab', dataLabRoutes)

// ACTIVITY FOR ASSISTANT
app.use('/praktikum', praktikumRoutes)

// DOSEN
app.use('/dosen', dosenRoutes)

// KELAS
app.use('/kelas', kelasRoutes)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})