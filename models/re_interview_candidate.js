'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Re_Interview_Candidate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Re_Interview_Candidate.belongsTo(models.Interview, {
        foreignKey: 'interview_id'
      });

      Re_Interview_Candidate.belongsTo(models.Candidate, {
        foreignKey: 'candidate_id'
      });
    }
  };
  Re_Interview_Candidate.init({
  }, {
    sequelize,
    modelName: 'Re_Interview_Candidate',
  });
  return Re_Interview_Candidate;
};