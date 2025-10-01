'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('historydetail-table', {
            idHistoryDetail: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            idHistory: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: 'historykegiatan-table',
                    key: 'idHistory',
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            },
            idDataLab: {
                type: Sequelize.STRING,
                allowNull: false,
                references: {
                    model: 'datalab-table',
                    key: 'idDataLab'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            },
            jumlahAwal: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            jumlahAkhir: {
                type: Sequelize.INTEGER,
                allowNull: false
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
        await queryInterface.dropTable('historydetail-table')
    }
};
