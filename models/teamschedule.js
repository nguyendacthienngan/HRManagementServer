'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TeamSchedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TeamSchedule.belongsTo(models.JobTitle,{
        foreignKey: 'position',
      });
      TeamSchedule.belongsTo(models.Team,{
        foreignKey: 'team_id',
      });
    }
  };
  TeamSchedule.init({
    team_id: DataTypes.INTEGER,
    position: DataTypes.INTEGER,
    date: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'TeamSchedule',
  });
  return TeamSchedule;
};