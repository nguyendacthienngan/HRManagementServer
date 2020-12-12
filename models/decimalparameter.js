'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DecimalParameter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  DecimalParameter.init({
    param_name: DataTypes.STRING,
    param_value: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'DecimalParameter',
    timestamps: true,
    paranoid: true,
  });
  return DecimalParameter;
};