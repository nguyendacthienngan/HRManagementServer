'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert('SalaryCoefficients', [{
       job_title_id: '1',
       value: '10000000',
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
        job_title_id: '2',
        value: '12000000',
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
        job_title_id: '3',
        value: '8000000',
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
        job_title_id: '4',
        value: '7500000',
        createdAt: new Date(),
        updatedAt: new Date()
    }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('SalaryCoefficients', null, {});
  }
};
