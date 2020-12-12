'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert('Benefits', [{
      benefit_name: 'Bảo Hiểm Xã Hội',
      start_date : new Date(2020, 5, 5),
      end_date: new Date(2025, 5, 5),
      short_description: '',
      createdAt: new Date(),
      updatedAt: new Date()
     },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Benefits', null, {});
  }
};
