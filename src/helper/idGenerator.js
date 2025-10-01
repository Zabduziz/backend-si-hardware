const { userModel } = require('../models')

// AUTOMATIC GENERATE USERID
const generatorIdUser = async() => {
    const lastUser = await userModel.findOne({
        order: [['idUser', 'DESC']]
    })

    let nextIdNumber = 1
    if (lastUser) {
        const lastId = lastUser.idUser
        const lastNumber = parseInt(lastId.replace('USR', ''), 10)
        nextIdNumber = lastNumber + 1
    }
    const formattedNumber = String(nextIdNumber).padStart(5, '0')
    return `USR${formattedNumber}`
}

module.exports = {
    generatorIdUser
}