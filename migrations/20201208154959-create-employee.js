'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Employees', {
      employee_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      manager_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references:{
          model: 'Employees',
          key: 'employee_id',
          as: 'manager_id',
          allowNull: true,
        },
        onDelete: 'SET NULL'
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      national_id: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      employ_type: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      job_title_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'JobTitles',
          key: 'title_id',
          allowNull: false,
        },
        onDelete: 'SET NULL'
      },
      salary_coefficient_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'SalaryCoefficients',
          key: 'coefficient_id',
          allowNull: false
        },
        onDelete: 'SET NULL'
      },
      birth_date: {
        type: Sequelize.DATE
      },
      gender: {
        type: Sequelize.INTEGER,
      },
      marital_status: {
        type: Sequelize.INTEGER
      },
      address: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
      },
      phone_contact_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'PhoneNumbers',
          key: 'phone_no_id',
          allowNull: false
        },
        onDelete: 'SET NULL'
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
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Employees');
  }
};