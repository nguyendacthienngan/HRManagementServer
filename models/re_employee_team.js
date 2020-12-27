'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Re_Employee_Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Re_Employee_Team.belongsTo(models.Employee, {
        foreignKey: 'employee_id'
      });

      Re_Employee_Team.belongsTo(models.Team, {
        foreignKey: 'team_id'
      });
    }
  };
  Re_Employee_Team.init({
  }, {
    sequelize,
    modelName: 'Re_Employee_Team',
  });
  return Re_Employee_Team;
};