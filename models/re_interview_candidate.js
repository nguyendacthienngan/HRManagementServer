'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Re_Interview_Candidate extends Model {
  };
  Re_Interview_Candidate.init({
  }, {
    sequelize,
    modelName: 'Re_Interview_Candidate',
  });
  return Re_Interview_Candidate;
};