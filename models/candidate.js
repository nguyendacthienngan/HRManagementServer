'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Candidate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Candidate.belongsTo(models.JobTitle,{
        foreignKey: 'title_id',
        //as:'position'
      });
      Candidate.belongsToMany(models.Interview, { 
        through: 'Re_Interview_Candidate', 
        foreignKey: 'candidate_id', 
      });
    }
  };
  Candidate.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    national_id: DataTypes.STRING,
    employee_type: DataTypes.INTEGER,
    position: DataTypes.INTEGER,
    birth_date: DataTypes.DATE,
    gender: DataTypes.INTEGER,
    candidate_state: DataTypes.INTEGER,
    email: DataTypes.STRING,
    phone_no: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Candidate',
    timestamps: true,
    paranoid: true,
  });
  return Candidate;
};