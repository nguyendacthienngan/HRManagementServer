'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Re_Interview_Candidates',
    {
      interview_id: 
      {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        raw: true,
        references:{
          model: 'Interviews',
          key: 'id',
          allowNull: false,
        }
      },
      candidate_id: 
      {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        raw: true,
        references:{
          model: 'Candidates',
          key: 'id',
          allowNull: false,
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE,
      }
    } 
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Re_Interview_Candidates');
  }
};
