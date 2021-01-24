'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Account.belongsTo(models.Employee,{
        foreignKey: 'employee_id',
      });
    }
  };
  Account.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.INTEGER,
    employee_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Account',
    timestamps: true,
    paranoid: true,
  });
  return Account;
};