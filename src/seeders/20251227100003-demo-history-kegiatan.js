'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('historykegiatan-table', [
            {
                idHistory: '550e8400-e29b-41d4-a716-446655440001',
                idUser: 'USR00001',
                idPraktikum: 'PRTK00001',
                idLab: 'LAB00001',
                idDosen: 'DSN00001',
                idKelas: 'KLS00001',
                tanggal: '2025-01-15',
                waktu: '09:00:00',
                tindakLanjut: 'Praktikum berjalan lancar, tidak ada kendala',
                ttd: 'uploads/signature1.png',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                idHistory: '550e8400-e29b-41d4-a716-446655440002',
                idUser: 'USR00002',
                idPraktikum: 'PRTK00002',
                idLab: 'LAB00002',
                idDosen: 'DSN00002',
                idKelas: 'KLS00002',
                tanggal: '2025-01-16',
                waktu: '10:30:00',
                tindakLanjut: 'Beberapa alat perlu perbaikan',
                ttd: 'uploads/signature2.png',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                idHistory: '550e8400-e29b-41d4-a716-446655440003',
                idUser: 'USR00001',
                idPraktikum: 'PRTK00001',
                idLab: 'LAB00001',
                idDosen: 'DSN00001',
                idKelas: 'KLS00001',
                tanggal: '2025-01-17',
                waktu: '13:00:00',
                tindakLanjut: 'Praktikum selesai sesuai jadwal',
                ttd: 'uploads/signature3.png',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                idHistory: '550e8400-e29b-41d4-a716-446655440004',
                idUser: 'USR00002',
                idPraktikum: 'PRTK00003',
                idLab: 'LAB00002',
                idDosen: 'DSN00003',
                idKelas: 'KLS00003',
                tanggal: '2025-01-20',
                waktu: '14:00:00',
                tindakLanjut: 'Perlu penambahan peralatan jaringan',
                ttd: 'uploads/signature4.png',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                idHistory: '550e8400-e29b-41d4-a716-446655440005',
                idUser: 'USR00001',
                idPraktikum: 'PRTK00004',
                idLab: 'LAB00001',
                idDosen: 'DSN00002',
                idKelas: 'KLS00002',
                tanggal: '2025-01-22',
                waktu: '08:00:00',
                tindakLanjut: 'Instalasi OS berhasil dilakukan',
                ttd: 'uploads/signature5.png',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                idHistory: '550e8400-e29b-41d4-a716-446655440006',
                idUser: 'USR00002',
                idPraktikum: 'PRTK00001',
                idLab: 'LAB00002',
                idDosen: 'DSN00001',
                idKelas: 'KLS00001',
                tanggal: '2025-02-01',
                waktu: '11:00:00',
                tindakLanjut: 'Praktikum lanjutan dengan perbaikan alat',
                ttd: 'uploads/signature6.png',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                idHistory: '550e8400-e29b-41d4-a716-446655440007',
                idUser: 'USR00001',
                idPraktikum: 'PRTK00002',
                idLab: 'LAB00001',
                idDosen: 'DSN00003',
                idKelas: 'KLS00003',
                tanggal: '2025-02-05',
                waktu: '15:30:00',
                tindakLanjut: 'Praktikum BIOS selesai dengan baik',
                ttd: 'uploads/signature7.png',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                idHistory: '550e8400-e29b-41d4-a716-446655440008',
                idUser: 'USR00002',
                idPraktikum: 'PRTK00003',
                idLab: 'LAB00002',
                idDosen: 'DSN00002',
                idKelas: 'KLS00002',
                tanggal: '2025-02-10',
                waktu: '09:30:00',
                tindakLanjut: 'Jaringan berhasil terkonfigurasi',
                ttd: 'uploads/signature8.png',
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ])
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('historykegiatan-table', null, {})
    }
};