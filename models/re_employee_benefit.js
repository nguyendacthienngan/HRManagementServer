'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Re_Employee_Benefit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Re_Employee_Benefit.belongsTo(models.Employee, {
        foreignKey: 'employee_id'
      });

      Re_Employee_Benefit.belongsTo(models.Benefit, {
        foreignKey: 'benefit_id'
      });
    }
  };
  Re_Employee_Benefit.init({
  }, {
    sequelize,
    modelName: 'Re_Employee_Benefit',
  });
  return Re_Employee_Benefit;
};