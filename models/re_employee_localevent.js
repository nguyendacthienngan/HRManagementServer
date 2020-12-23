'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Re_Employee_LocalEvent extends Model {
  };
  Re_Employee_LocalEvent.init({
  }, {
    sequelize,
    modelName: 'Re_Employee_LocalEvent',
  });
  return Re_Employee_LocalEvent;
};