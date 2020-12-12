'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Re_Employee_Benefit',
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
      benefit_id: 
      {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references:{
          model: 'Benefits',
          key: 'benefit_id',
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
    return queryInterface.dropTable('Re_Employee_Benefit');
  }
};
