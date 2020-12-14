'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Employee.belongsTo(models.JobTitle,{
        foreignKey: 'job_title_id',
      });
      Employee.belongsTo(models.PhoneNumber,{
        foreignKey: 'phone_contact_id',
      });
      Employee.belongsToMany(models.Benefit, { 
        through: 'Re_Employee_Benefit', 
        foreignKey: 'employee_id', 
      });
      Employee.belongsToMany(models.Team, { 
        through: 'Re_Employee_Team', 
        foreignKey: 'employee_id', 
      });
      Employee.belongsToMany(models.LocalEvent, { 
        through: 'Re_Employee_LocalEvent', 
        foreignKey: 'employee_id', 
      });
      Employee.belongsToMany(models.Interview, { 
        through: 'Re_Interview_Employee', 
        foreignKey: 'employee_id', 
      });
    }
  };
  Employee.init({
    manager_id: DataTypes.INTEGER,
    first_name : DataTypes.STRING, 
    last_name : DataTypes.STRING, 
    national_id: DataTypes.STRING,
    employ_type: DataTypes.INTEGER,
    job_title_id: DataTypes.INTEGER,
    salary_coefficient_id: DataTypes.INTEGER,
    birth_date: DataTypes.DATE,
    gender: DataTypes.INTEGER,
    marital_status: DataTypes.INTEGER,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    phone_contact_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Employee',
    timestamps: true,
    paranoid: true,
  });
  return Employee;
};