const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const port = 3000


const userRoutes = require('./routes/userRoutes')
const roleRoutes = require('./routes/roleRoutes')

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// USER
app.use('/auth', userRoutes)

// ROLE
app.use('/role', roleRoutes)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
