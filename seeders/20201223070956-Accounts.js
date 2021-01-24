'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert('Accounts', [{
       username: 'heoboi',
       password: '123456',
       role: 2,
       employee_id: 1,
       createdAt: new Date(),
       updatedAt: new Date()
     },{
      username: 'bachnguyen',
      password: '123456',
      role: 1,
      employee_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      username: 'dungchung',
      password: '123456',
      role: 1,
      employee_id: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      username: 'thichuong',
      password: '123456',
      role: 0,
      employee_id: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Accounts', null, {});
  }
};
