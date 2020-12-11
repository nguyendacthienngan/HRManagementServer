'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PhoneNumber extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  PhoneNumber.init({
    emergency_call: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PhoneNumber',
  });
  return PhoneNumber;
};