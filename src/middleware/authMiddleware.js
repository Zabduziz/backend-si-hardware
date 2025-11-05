const jwt = require("jsonwebtoken")
const SECRET_KEY = process.env.SECRET_KEY_TOKEN

const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization']
    if (!bearerHeader) return res.status(403).json({ message: "Anda belum Login! Silahkan login terlebih dahulu!" })

    const token = bearerHeader.split(" ")[1]
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Token tidak valid" })
        req.user = decoded;
        next()
    })
}

module.exports = verifyToken