'use Strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class barangModel extends Model {
        static associate(models) {
            this.hasMany(models.dataLabModel, {foreignKey: 'idBarang'})
        }
    }
    barangModel.init({
        idBarang: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            primaryKey: true,
        },
        namaBarang: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        deskripsiBarang: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "no description",
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
        modelName: 'barangModel',
        tableName: 'barang-table',
        timestamps: true
    })
    return barangModel
}