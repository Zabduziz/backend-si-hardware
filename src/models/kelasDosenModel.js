'use Strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class kelasDosenModel extends Model {
        static associate(models) {
            this.belongsTo(models.dosenModel, { foreignKey: 'idDosen' })
            this.belongsTo(models.kelasModel, { foreignKey: 'idKelas' })
        }
    }
    kelasDosenModel.init({
        idKelasDosen: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        idDosen: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'dosen-table',
                key: 'idDosen'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        idKelas: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'kelas-table',
                key: 'idKelas'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        tahunAjar: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        tahunSelesai: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        semester: {
            type: DataTypes.ENUM(
                'Ganjil',
                'Genap'
            ),
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
        modelName: 'kelasDosenModel',
        tableName: 'kelasdosen-table',
        timestamps: true
    })
    return kelasDosenModel
}