'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('ruanglab-table', {
            idLab: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false,
                primaryKey: true
            },
            ruanganLab: {
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
        await queryInterface.dropTable('ruanglab-table')
    }
};
