'use Strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class historyKegiatanModel extends Model {
        static associate(models) {
            this.belongsTo(models.userModel, {foreignKey: 'idUser'})
            this.belongsTo(models.tipePraktikumModel, {foreignKey: 'idPraktikum'})
            this.belongsTo(models.ruangLabModel, {foreignKey: 'idLab'})
            this.hasMany(models.historyDetailModel, {foreignKey: 'idHistory'})
        }
    }
    historyKegiatanModel.init({
        idHistory: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        idUser: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'user-table',
                key: 'idUser'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        idPraktikum: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'tipepraktikum-table',
                key: 'idPraktikum'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
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
        tanggal: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        waktu: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        dosen: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        kelas: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tindakLanjut: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ttd: {
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
        modelName: 'historyKegiatanModel',
        tableName: 'historykegiatan-table'
    })
    return historyKegiatanModel
}