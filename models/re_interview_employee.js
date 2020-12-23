'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Re_Interview_Employee extends Model {
  };
  Re_Interview_Employee.init({
  }, {
    sequelize,
    modelName: 'Re_Interview_Employee',
  });
  return Re_Interview_Employee;
};