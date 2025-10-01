'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('datalab-table', {
            idDataLab: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
                primaryKey: true
            },
            idLab: {
                type: Sequelize.STRING,
                allowNull: false,
                references: {
                    model: 'ruanglab-table',
                    key: 'idLab'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            },
            idBarang: {
                type: Sequelize.STRING,
                allowNull: false,
                references: {
                    model: 'barang-table',
                    key: 'idBarang'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            },
            jumlahNormal: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            jumlahRusak: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal("CURRENT_TIMESTAMP")
            }
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('datalab-table')
    }
};
