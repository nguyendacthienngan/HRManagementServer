'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SalaryCoefficient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SalaryCoefficient.hasMany(models.Employee,{
        foreignKey: 'salary_coefficient_id',
      });
    }
  };
  SalaryCoefficient.init({
    job_title_id: DataTypes.INTEGER,
    value: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SalaryCoefficient',
  });
  return SalaryCoefficient;
};