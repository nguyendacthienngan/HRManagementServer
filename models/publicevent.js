'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PublicEvent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PublicEvent.belongsTo(models.Event,{
        foreignKey: 'event_id',
        //as:'event_info_id'
      });
    }
  };
  PublicEvent.init({
    event_info_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PublicEvent',
    timestamps: true,
    paranoid: true,
  });
  return PublicEvent;
};