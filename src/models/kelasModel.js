'use Strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class kelasModel extends Model {
        static associate(models) {
            this.hasMany(models.historyKegiatanModel, { foreignKey: 'idKelas' })
            this.hasMany(models.kelasDosenModel, { foreignKey: 'idKelas' })
        }
    }
    kelasModel.init({
        idKelas: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        namaKelas: {
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
        modelName: 'kelasModel',
        tableName: 'kelas-table',
        timestamps: true
    })
    return kelasModel
}