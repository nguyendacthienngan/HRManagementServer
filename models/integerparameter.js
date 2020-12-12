'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class IntegerParameter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  IntegerParameter.init({
    param_name: DataTypes.STRING,
    param_value: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'IntegerParameter',
    timestamps: true,
    paranoid: true,
  });
  return IntegerParameter;
};