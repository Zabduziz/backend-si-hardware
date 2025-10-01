'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('user-table', {
            idUser: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
                primaryKey: true,
            },
            idRole: {
                type: Sequelize.STRING,
                allowNull: false,
                references: {
                    model: 'role-table',
                    key: 'idRole'
                },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            nama: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            nim: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false
            },
            isActive: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
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
        await queryInterface.dropTable('user-table')
    }
};
