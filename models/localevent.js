'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class LocalEvent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      LocalEvent.belongsTo(models.Event,{
        foreignKey: 'event_info_id',
      });
      LocalEvent.belongsToMany(models.Employee, { 
        through: 'Re_Employee_LocalEvent', 
        foreignKey: 'local_event_id', 
      });
    }
  };
  LocalEvent.init({
    event_info_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'LocalEvent',
    timestamps: true,
    paranoid: true,
  });
  return LocalEvent;
};