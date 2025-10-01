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
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('user-table', null, {})
        await queryInterface.bulkDelete('role-table', null, {})
    }
};
