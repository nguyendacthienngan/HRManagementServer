'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Re_Employee_Team extends Model {
  };
  Re_Employee_Team.init({
  }, {
    sequelize,
    modelName: 'Re_Employee_Team',
  });
  return Re_Employee_Team;
};