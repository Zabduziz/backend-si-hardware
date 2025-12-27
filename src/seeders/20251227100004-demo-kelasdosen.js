'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('kelasdosen-table', [
            {
                idDosen: 'DSN00001',
                idKelas: 'KLS00001',
                tahunAjar: 2024,
                tahunSelesai: 2025,
                semester: 'Ganjil',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                idDosen: 'DSN00002',
                idKelas: 'KLS00002',
                tahunAjar: 2024,
                tahunSelesai: 2025,
                semester: 'Ganjil',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                idDosen: 'DSN00003',
                idKelas: 'KLS00003',
                tahunAjar: 2024,
                tahunSelesai: 2025,
                semester: 'Ganjil',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                idDosen: 'DSN00001',
                idKelas: 'KLS00002',
                tahunAjar: 2024,
                tahunSelesai: 2025,
                semester: 'Genap',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                idDosen: 'DSN00002',
                idKelas: 'KLS00001',
                tahunAjar: 2024,
                tahunSelesai: 2025,
                semester: 'Genap',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ])
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('kelasdosen-table', null, {})
    }
};