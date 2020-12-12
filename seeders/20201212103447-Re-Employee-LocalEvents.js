'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert('Re_Employee_LocalEvent', [{
        employee_id: 1,
        local_event_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
      employee_id: 2,
      local_event_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      employee_id: 3,
      local_event_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      employee_id: 4,
      local_event_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
     }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Re_Employee_LocalEvent', null, {});
  }
};
