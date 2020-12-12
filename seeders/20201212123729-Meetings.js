'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert('Meetings', [{
        local_event_id: 2,
        room_id: 1,
        meeting_status: 0,
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
      local_event_id: 2,
      room_id: 2,
      meeting_status: 0,
      createdAt: new Date(),
      updatedAt: new Date()
     }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Meetings', null, {});
  }
};
