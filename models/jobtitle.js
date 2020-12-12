'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JobTitle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  JobTitle.init({
    title_name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'JobTitle',
    timestamps: true,
    paranoid: true,
  });
  return JobTitle;
};