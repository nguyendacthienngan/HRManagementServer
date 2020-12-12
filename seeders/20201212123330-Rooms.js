'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert('Rooms', [{
        room_name: 'RoomA',
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
      room_name: 'RoomB',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      room_name: 'RoomC',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Rooms', null, {});
  }
};
