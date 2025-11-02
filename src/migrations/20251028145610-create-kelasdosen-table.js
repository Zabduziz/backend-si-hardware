'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('kelasdosen-table', {
            idKelasDosen: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                unique: true,
                primaryKey: true
            },
            idDosen: {
                type: Sequelize.STRING,
                allowNull: false,
                references: {
                    model: 'dosen-table',
                    key: 'idDosen'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            },
            idKelas: {
                type: Sequelize.STRING,
                allowNull: false,
                references: {
                    model: 'kelas-table',
                    key: 'idKelas'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            },
            tahunAjar: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            tahunSelesai: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            semester: {
                type: Sequelize.ENUM(
                    'Ganjil',
                    'Genap'
                ),
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
        await queryInterface.dropTable('kelasdosen-table')
    }
};
