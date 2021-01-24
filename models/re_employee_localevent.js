'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Re_Employee_LocalEvent extends Model {
    static associate(models) {
      // define association here
      Re_Employee_LocalEvent.belongsTo(models.Employee, {
        foreignKey: 'employee_id'
      });

      Re_Employee_LocalEvent.belongsTo(models.LocalEvent, {
        foreignKey: 'local_event_id'
      });
    }
  };
  Re_Employee_LocalEvent.init({
  }, {
    sequelize,
    modelName: 'Re_Employee_LocalEvent',
  });
  return Re_Employee_LocalEvent;
};