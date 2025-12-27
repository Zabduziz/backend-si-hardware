'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('kelas-table', [
            {
                idKelas: 'KLS00001',
                namaKelas: 'TI-4A',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                idKelas: 'KLS00002',
                namaKelas: 'TI-4B',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                idKelas: 'KLS00003',
                namaKelas: 'TI-4C',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ])
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('kelas-table', null, {})
    }
};