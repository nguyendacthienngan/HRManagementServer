'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TimeOffs', {
      time_off_id: {
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
          key: 'local_event_id',
          allowNull: false,
        },
        onDelete: 'SET NULL'
      },
      leave_type: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'LeaveTypes',
          key: 'leave_id',
          as: 'leave_type',
          allowNull: false,
        },
        onDelete: 'SET NULL'
      },
      day_off: {
        type: Sequelize.DOUBLE
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