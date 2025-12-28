'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'historydetail-table',
        'isResolved',
        {
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: true
        }
      ),
      queryInterface.addColumn(
        'historydetail-table',
        'catatan',
        {
          type: Sequelize.STRING,
          allowNull: true
        }
      )
    ])
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('historydetail-table', 'isResolved'),
      queryInterface.removeColumn('historydetail-table', 'catatan')
    ])
  }
};
