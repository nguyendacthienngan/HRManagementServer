'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert('Teams', [{
        team_name:'Dev 1',
        manager_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
        team_name:'Dev 2',
        manager_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
     }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Teams', null, {});
  }
};
