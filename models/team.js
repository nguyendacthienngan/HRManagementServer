'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Team.belongsToMany(models.Employee, { 
        through: 'Re_Employee_Team', 
        foreignKey: 'team_id', 
      });
    }
  };
  Team.init({
    team_name: DataTypes.STRING,
    team_type: DataTypes.INTEGER,
    manager_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Team',
    timestamps: true,
    paranoid: true,
  });
  return Team;
};