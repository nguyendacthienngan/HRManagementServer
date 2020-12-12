'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert('Managers', [{
      employee_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
       employee_id: 2,
       createdAt: new Date(),
        updatedAt: new Date()
     }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Managers', null, {});
  }
};
