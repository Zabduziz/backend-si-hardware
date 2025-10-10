'use Strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class dataLabModel extends Model {
        static associate(models) {
            this.belongsTo(models.barangModel, {foreignKey: 'idBarang'})
            this.belongsTo(models.ruangLabModel, {foreignKey: 'idLab'})
        }
    }
    dataLabModel.init({
        idDataLab: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        idLab: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'ruanglab-table',
                key: 'idLab'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        idBarang: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'barang-table',
                key: 'idBarang'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        jumlahNormal: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        jumlahRusak: {
            type: DataTypes.INTEGER,
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
        modelName: 'dataLabModel',
        tableName: 'datalab-table',
        timestamps: true
    })
    return dataLabModel
}