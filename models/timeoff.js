'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TimeOff extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TimeOff.belongsTo(models.LocalEvent,{
        foreignKey: 'local_event_id',
      });
      TimeOff.belongsTo(models.LeaveType,{
        foreignKey: 'leave_id',
        as: 'leave_type'
      });
    }
  };
  TimeOff.init({
    local_event_id: DataTypes.INTEGER,
    leave_type: DataTypes.INTEGER,
    leave_hours: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'TimeOff',
  });
  return TimeOff;
};