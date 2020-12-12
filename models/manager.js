'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Manager extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Manager.hasMany(models.Team,{
        foreignKey: 'manager_id',
      });
      Manager.belongsTo(models.Employee,{
        foreignKey: 'employee_id',
      });
    }
  };
  Manager.init({
    employee_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Manager',
    timestamps: true,
    paranoid: true,
  });
  return Manager;
};