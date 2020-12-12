'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert('PhoneNumbers', [{
       emergency_call: '012345789',
       personal_call: '012345789',
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
      emergency_call: '0123444444',
      personal_call: '0123444444',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      emergency_call: '0123455555',
      personal_call: '0123455555',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      emergency_call: '0123456666',
      personal_call: '0123456666',
      createdAt: new Date(),
      updatedAt: new Date()
     },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('PhoneNumbers', null, {});
  }
};
