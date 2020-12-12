'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert('JobTitles', [{
       title_name: 'HR Manager',
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       title_name: 'Manager',
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       title_name: 'Developer',
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
      title_name: 'HR',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('JobTitles', null, {});
  }
};
