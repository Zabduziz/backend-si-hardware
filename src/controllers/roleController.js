const { roleModel } = require('../models')

// GET ROLE
const getRole = async(req,res)=> {
    try {
        const role = await roleModel.findAll({
            attributes: ['idRole', 'roleName']
        })
        return res.status(200).json(role)
    } catch (e) {
        console.error(e.message)
        res.status(500).json({ message: e.message })
    }
}

module.exports = {
    getRole,
}