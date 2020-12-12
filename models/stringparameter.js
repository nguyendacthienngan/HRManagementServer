'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StringParameter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  StringParameter.init({
    param_name: DataTypes.STRING,
    param_value: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'StringParameter',
    timestamps: true,
    paranoid: true,
  });
  return StringParameter;
};