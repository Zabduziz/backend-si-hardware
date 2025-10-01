'use Strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class ruangLabModel extends Model {
        static associate(models) {}
    }
    ruangLabModel.init({
        idLab: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            primaryKey: true
        },
        ruanganLab: {
            type: DataTypes.STRING,
            allowNull: false,
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
        modelName: 'ruangLabModel',
        tableName: 'ruanglab-table',
        timestamps: true
    })
    return ruangLabModel
}