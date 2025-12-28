'use Strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class historyDetailModel extends Model {
        static associate(models) {
            this.belongsTo(models.historyKegiatanModel, {foreignKey: 'idHistory'})
            this.belongsTo(models.dataLabModel, {foreignKey: 'idDataLab'})
        }
    }
    historyDetailModel.init({
        idHistoryDetail: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        idHistory: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'historykegiatan-table',
                key: 'idHistory',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        idDataLab: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'datalab-table',
                key: 'idDataLab'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        jumlahAwal: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        jumlahAkhir: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        jumlahRusak: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        isResolved: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true
        },
        catatan: {
            type: DataTypes.STRING,
            allowNull: true
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
        modelName: 'historyDetailModel',
        tableName: 'historydetail-table'
    })
    return historyDetailModel
}