'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Interviews', {
      interview_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      public_event_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'PublicEvents',
          key: 'public_event_id',
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
    await queryInterface.dropTable('Interviews');
  }
};