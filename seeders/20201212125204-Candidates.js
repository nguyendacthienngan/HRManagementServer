'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert('Candidates', [{
        first_name:'Chương',
        last_name:'Khánh',
        national_id: '079300001111',
        employ_type: 0,
        position: 3,
        birth_date: new Date(2020, 4, 21),
        gender: 1,
        candidate_state: 1, 
        email: 'ngan@gmail.com',
        phone_no: '0123456789',
        createdAt: new Date(),
        updatedAt: new Date()
     },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Candidates', null, {});
  }
};
