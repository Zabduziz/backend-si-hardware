'use Strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class userModel extends Model {
        static associate(models) {
            this.belongsTo(models.roleModel, {foreignKey: 'idRole'})
        }
    }
    userModel.init({
        idUser: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true,
        },
        idRole: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'role-table',
                key: 'idRole'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        nama: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nim: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
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
        modelName: 'userModel',
        tableName: 'user-table',
        timestamps: true,
    })
    return userModel
}