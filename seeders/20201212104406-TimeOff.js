'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert('TimeOffs', [{
        local_event_id: 1,
        leave_type: 1,
        day_off: 12,
        createdAt: new Date(),
        updatedAt: new Date()
     },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('TimeOffs', null, {});
  }
};
