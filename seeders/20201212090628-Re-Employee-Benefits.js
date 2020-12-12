'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert('Re_Employee_Benefit', [{
      employee_id: 1,
      benefit_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      employee_id: 2,
      benefit_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      employee_id: 3,
      benefit_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      employee_id: 4,
      benefit_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
     }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Re_Employee_Benefit', null, {});
  }
};
