'use Strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class roleModel extends Model {
        static associate(models) {
            this.hasMany(models.userModel, {foreignKey: 'idRole'})
        }
    }
    roleModel.init({
        idRole: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            primaryKey: true
        },
        roleName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
        }
    }, {
        sequelize,
        modelName: 'roleModel',
        tableName: 'role-table',
        timestamps: true
    })
    return roleModel
}