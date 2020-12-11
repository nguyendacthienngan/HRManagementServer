'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Benefit extends Model {
    static associate(models) {
      Benefit.belongsToMany(models.Employee, { 
        through: 'Re_Employee_Benefit', 
        foreignKey: 'benefit_id', 
      });
    }
  };
  Benefit.init({
    benefit_name: DataTypes.STRING,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    short_description: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Benefit',
  });
  return Benefit;
};