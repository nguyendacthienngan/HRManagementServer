'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert('LeaveTypes', [{
        leave_type_name: 'Sick Leave',
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
      leave_type_name: 'Maternity/Paternity',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      leave_type_name: 'Casual leave',
      createdAt: new Date(),
      updatedAt: new Date()
     }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('LeaveTypes', null, {});
  }
};
