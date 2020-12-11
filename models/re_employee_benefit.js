'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Re_Employee_Benefit extends Model {
  };
  Re_Employee_Benefit.init({
  }, {
    sequelize,
    modelName: 'Re_Employee_Benefit',
  });
  return Re_Employee_Benefit;
};