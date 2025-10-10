const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const port = 3000


const userRoutes = require('./routes/userRoutes')
const roleRoutes = require('./routes/roleRoutes')
const dataLabRoutes = require('./routes/dataLabRoutes')

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// USER
app.use('/auth', userRoutes)

// ROLE
app.use('/role', roleRoutes)

// DATALAB
app.use('/datalab', dataLabRoutes)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
