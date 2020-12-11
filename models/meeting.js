'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Meeting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Meeting.belongsTo(models.LocalEvent,{
        foreignKey: 'local_event_id',
      });
      Meeting.belongsTo(models.Room,{
        foreignKey: 'room_id',
      });
    }
  };
  Meeting.init({
    local_event_id: DataTypes.INTEGER,
    room_id: DataTypes.INTEGER,
    meeting_status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Meeting',
  });
  return Meeting;
};