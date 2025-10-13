'use Strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class tipePraktikumModel extends Model {
        static associate(models) {
            this.hasMany(models.historyKegiatanModel, {foreignKey: 'idPraktikum'})
        }
    }
    tipePraktikumModel.init({
        idPraktikum: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            primaryKey: true,
        },
        namaPraktikum: {
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
        modelName: 'tipePraktikumModel',
        tableName: 'tipepraktikum-table'
    })
    return tipePraktikumModel
}