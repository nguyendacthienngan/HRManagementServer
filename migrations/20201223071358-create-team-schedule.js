'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TeamSchedules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      team_id: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Teams',
          key: 'id',
          as: 'team_id',
          allowNull: true,
        },
        onDelete: 'SET NULL'
      },
      position: {
        type: Sequelize.INTEGER,
        references:{
          model: 'JobTitles',
          key: 'id',
          as: 'position',
          allowNull: true,
        },
        onDelete: 'SET NULL'
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('TeamSchedules');
  }
};