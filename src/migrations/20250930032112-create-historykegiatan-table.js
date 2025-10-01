'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('historykegiatan-table', {
            idHistory: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
                unique: true
            },
            idUser: {
                type: Sequelize.STRING,
                allowNull: false,
                references: {
                    model: 'user-table',
                    key: 'idUser'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
            },
            idPraktikum: {
                type: Sequelize.STRING,
                allowNull: false,
                references: {
                    model: 'tipepraktikum-table',
                    key: 'idPraktikum'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE'
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
            tanggal: {
                type: Sequelize.DATEONLY,
                allowNull: false,
            },
            waktu: {
                type: Sequelize.TIME,
                allowNull: false,
            },
            dosen: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            kelas: {
                type: Sequelize.STRING,
                allowNull: false
            },
            tindakLanjut: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            ttd: {
                type: Sequelize.STRING,
                allowNull: false,
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
        await queryInterface.dropTable('historykegiatan-table')
    }
};
