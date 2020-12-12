'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Meetings', {
      meeting_id: {
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
      room_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'Rooms',
          key: 'room_id',
          allowNull: false,
        },
        onDelete: 'SET NULL'
      },
      meeting_status: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Meetings');
  }
};