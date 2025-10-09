'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const dataToSeed = []
        let dataLabCounter = 1

        const lab = ['LAB00001', 'LAB00002']

        for (const idLab of lab) {
            for (let i = 1; i <= 12; i++) {
                const idDataLab = 'DL' + dataLabCounter.toString().padStart(5, '0')
                const idBarang = 'BRNG' + i.toString().padStart(5, '0')

                dataToSeed.push({
                    idDataLab: idDataLab,
                    idLab: idLab,
                    idBarang: idBarang,
                    jumlahNormal: 0,
                    jumlahRusak: 0
                })
                dataLabCounter++
            }
        }

        await queryInterface.bulkInsert('datalab-table', dataToSeed)
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('datalab-table', null, {})
    }
};
