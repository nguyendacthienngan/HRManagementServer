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
          key: 'employee_id',
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
          key: 'team_id',
          allowNull: false,
        }
      },
    } 
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Re_Employee_Team');
  }
};
