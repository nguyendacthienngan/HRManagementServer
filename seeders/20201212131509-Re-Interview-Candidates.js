'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert('Re_Interview_Candidate', [{
        interview_id: 1,
        candidate_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
     },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Re_Interview_Candidate', null, {});
  }
};
