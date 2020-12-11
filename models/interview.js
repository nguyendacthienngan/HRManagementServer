'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Interview extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Interview.belongsTo(models.PublicEvent,{
        foreignKey: 'public_event_id',
      });
      Interview.belongsTo(models.Room,{
        foreignKey: 'room_id',
      });
      Interview.belongsToMany(models.Candidate, { 
        through: 'Re_Interview_Candidate', 
        foreignKey: 'interview_id', 
      });
      Interview.belongsToMany(models.Employee, { 
        through: 'Re_Interview_Employee', 
        foreignKey: 'interview_id', 
      });
    }
  };
  Interview.init({
    public_event_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Interview',
  });
  return Interview;
};