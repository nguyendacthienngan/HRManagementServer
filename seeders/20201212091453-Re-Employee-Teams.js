'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert('Re_Employee_Team', [{
        employee_id: 1,
        team_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
        employee_id: 2,
        team_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
     }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Re_Employee_Team', null, {});
  }
};
