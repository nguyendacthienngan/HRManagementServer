'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert('Re_Interview_Employee', [{
        interview_id: 1,
        employee_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
     },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Re_Interview_Employee', null, {});
  }
};
