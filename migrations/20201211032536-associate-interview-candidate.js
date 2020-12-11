'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Re_Interview_Candidate',
    {
      interview_id: 
      {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references:{
          model: 'Interviews',
          key: 'interview_id',
          allowNull: false,
        }
      },
      candidate_id: 
      {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references:{
          model: 'Candidates',
          key: 'candidate_id',
          allowNull: false,
        }
      },
    } 
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Re_Interview_Candidate');
  }
};
