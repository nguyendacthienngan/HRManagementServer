'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert('Events', [{
        event_name:'Recruitment',
        start_date : new Date(2020, 10, 1),
        end_date: new Date(2025, 12, 31),
        announcement:'Tuyển dụng bộ phận Dev',
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
      event_name:'Time Off',
      start_date : new Date(2020, 11, 5),
      end_date: new Date(2025, 11, 6),
      announcement:'Nghỉ phép',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      event_name:'Meeting',
      start_date : new Date(2020, 11, 5),
      end_date: new Date(2025, 11, 6),
      announcement:'Họp meeting',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      event_name:'Team building',
      start_date : new Date(2020, 11, 5),
      end_date: new Date(2025, 11, 6),
      announcement:'Tuyển dụng bộ phận Dev',
      createdAt: new Date(),
      updatedAt: new Date()
     },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Events', null, {});
  }
};
