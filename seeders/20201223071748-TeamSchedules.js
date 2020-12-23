'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert('TeamSchedules', [{
        team_id: 1,
        position: 3,
        date: new Date(2020,12,2),
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
      team_id: 1,
      position: 3,
      date: new Date(2020,12,3),
      createdAt: new Date(),
      updatedAt: new Date()
   },
   {
    team_id: 1,
    position: 3,
    date: new Date(2020,12,4),
    createdAt: new Date(),
    updatedAt: new Date()
 },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('TeamSchedules', null, {});
  }
};
