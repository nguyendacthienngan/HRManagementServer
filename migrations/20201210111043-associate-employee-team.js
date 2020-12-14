'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Re_Employee_Team',
    {
      employee_id: 
      {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references:{
          model: 'Employees',
          key: 'id',
          allowNull: false,
        }
      },
      team_id: 
      {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references:{
          model: 'Teams',
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
    return queryInterface.dropTable('Re_Employee_Team');
  }
};
