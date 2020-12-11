'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Re_Interview_Employee',
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
    } 
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Re_Interview_Employee');
  }
};
