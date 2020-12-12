'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert('LocalEvents', [{
        event_info_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
      event_info_id: 3,
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      event_info_id: 4,
      createdAt: new Date(),
      updatedAt: new Date()
     }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('LocalEvents', null, {});
  }
};
