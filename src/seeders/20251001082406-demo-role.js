const bcrypt = require('bcryptjs')
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const hashedPassword = await bcrypt.hash('Password12345', 10)

        await queryInterface.bulkInsert('role-table', [
            {
                idRole: "ADM",
                roleName: "Administrator"
            }, {
                idRole: "AST",
                roleName: "Assistant"
            }
        ])

        await queryInterface.bulkInsert('user-table', [
            {
                idUser: 'USR00001',
                idRole: 'ADM',
                nama: 'Administrator',
                email: 'admin@gmail.com',
                nim: '111111111',
                password: hashedPassword,
                isActive: true
            }, {
                idUser: 'USR00002',
                idRole: 'AST',
                nama: 'Assistant',
                email: 'asisten@gmail.com',
                nim: '222222222',
                password: hashedPassword,
                isActive: true
            }
        ])

        await queryInterface.bulkInsert('ruanglab-table', [
            {
                idLab: 'LAB00001',
                ruanganLab: 'R.609'
            },
            {
                idLab: 'LAB00002',
                ruanganLab: 'R.610'
            }
        ])

        await queryInterface.bulkInsert('tipepraktikum-table', [
            {
                idPraktikum: 'PRTK00001',
                namaPraktikum: 'Merakit Komputer'
            },
            {
                idPraktikum: 'PRTK00002',
                namaPraktikum: ' BIOS dan Partisi'
            },
            {
                idPraktikum: 'PRTK00003',
                namaPraktikum: 'Jaringan Komputer'
            },
            {
                idPraktikum: 'PRTK00004',
                namaPraktikum: 'Installasi Sistem Operasi'
            }
        ])

        await queryInterface.bulkInsert('barang-table', [
            {
                idBarang: 'BRNG00001',
                namaBarang: 'Motherboard'
            },
            {
                idBarang: 'BRNG00002',
                namaBarang: 'Fan'
            },
            {
                idBarang: 'BRNG00003',
                namaBarang: 'Processor'
            },
            {
                idBarang: 'BRNG00004',
                namaBarang: 'Ram'
            },
            {
                idBarang: 'BRNG00005',
                namaBarang: 'Power Supply'
            },
            {
                idBarang: 'BRNG00006',
                namaBarang: 'Kabel SATA'
            },
            {
                idBarang: 'BRNG00007',
                namaBarang: 'Harddisk'
            },
            {
                idBarang: 'BRNG00008',
                namaBarang: 'Puzzle Mat'
            },
            {
                idBarang: 'BRNG00009',
                namaBarang: 'Komputer'
            },
            {
                idBarang: 'BRNG00010',
                namaBarang: 'Flashdisk'
            },
            {
                idBarang: 'BRNG00011',
                namaBarang: 'Crimping Tools'
            },
            {
                idBarang: 'BRNG00012',
                namaBarang: 'Lan Tester'
            },
            {
                idBarang: 'BRNG00013',
                namaBarang: 'Pengupas Kabel'
            },
            {
                idBarang: 'BRNG00014',
                namaBarang: 'Gunting'
            }
        ])
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('user-table', null, {})
        await queryInterface.bulkDelete('role-table', null, {})
        await queryInterface.bulkDelete('ruanglab-table', null, {})
        await queryInterface.bulkDelete('tipepraktikum-table', null, {})
        await queryInterface.bulkDelete('barang-table', null, {})
    }
};
