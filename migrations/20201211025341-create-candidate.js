'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Candidates', {
      candidate_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      national_id: {
        type: Sequelize.STRING
      },
      employ_type: {
        type: Sequelize.INTEGER
      },
      position: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'JobTitles',
          key: 'title_id',
          as:'position',
          allowNull: false,
        },
        onDelete: 'SET NULL'
      },
      birth_date: {
        type: Sequelize.DATE
      },
      gender: {
        type: Sequelize.INTEGER
      },
      candidate_state: {
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      phone_no: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Candidates');
  }
};