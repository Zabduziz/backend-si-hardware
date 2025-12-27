'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('dosen-table', [
            {
                idDosen: 'DSN00001',
                namaDosen: 'Dr. Ahmad Kurniawan, M.Kom',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                idDosen: 'DSN00002',
                namaDosen: 'Dr. Siti Aminah, S.T., M.T',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                idDosen: 'DSN00003',
                namaDosen: 'Dr. Budi Santoso, S.Kom., M.Sc',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ])
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('dosen-table', null, {})
    }
};