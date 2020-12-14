'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TimeOffs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      local_event_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'LocalEvents',
          key: 'id',
          allowNull: false,
        },
        onDelete: 'SET NULL'
      },
      leave_type: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'LeaveTypes',
          key: 'id',
          as: 'leave_type',
          allowNull: false,
        },
        onDelete: 'SET NULL'
      },
      day_off: {
        type: Sequelize.DECIMAL
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
    await queryInterface.dropTable('TimeOffs');
  }
};