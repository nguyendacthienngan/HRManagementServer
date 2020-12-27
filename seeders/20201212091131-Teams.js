'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert('Teams', [{
        team_name:'Dev 1',
        manager_id: 1,
        team_type: 0,
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
        team_name:'Dev 2',
        manager_id: 2,
        team_type: 0,
        createdAt: new Date(),
        updatedAt: new Date()
     }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Teams', null, {});
  }
};
