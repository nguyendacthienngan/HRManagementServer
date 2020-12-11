'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LeaveType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  LeaveType.init({
    leave_type_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'LeaveType',
  });
  return LeaveType;
};