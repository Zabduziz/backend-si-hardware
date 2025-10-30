'use Strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class dosenModel extends Model {
        static associate(models) {
            this.hasMany(models.historyKegiatanModel, { foreignKey: 'idDosen' })
            this.hasMany(models.kelasDosenModel, { foreignKey: 'idDosen' })
        }
    }
    dosenModel.init({
        idDosen: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        namaDosen: {
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
        modelName: 'dosenModel',
        tableName: 'dosen-table',
        timestamps: true
    })
    return dosenModel
}