const db = require("../models");
const sequelize = require("sequelize");
const Employee = db.Employee;
const http = require("../utils/http-status");

module.exports.getAll = (req, res, next) => {
  Employee.findAll(
    {
      attributes: ["employee_id", "manager_id", "first_name", "last_name", "national_id"],
    }
  )
    .then((users) => {
      res.status(http.OK).json(users);
    })
    .catch((err) => {
      if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
      next(err);
    });
}

module.exports.getEmployee = (req, res, next) => {
  Employee.findOne({
    attributes: [
      "employee_id", "manager_id", "first_name", "last_name", "national_id",
      "employ_type", "job_title_id", "salary_coefficient_id",
      "birth_date", "gender", "marital_status", "address", "email",
      "phone_contact_id"
    ],
    where: {
      employee_id: req.params.id
    }
  })
    .then((employee) => {
      res.status(http.OK).json(employee);
    })
    .catch((err) => {
      if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
      next(err);
    })
}

module.exports.createEmployee = (req, res, next) => {
  const managerId = req.body.manager_id;
  const firstName = req.body.first_name;
  const lastName = req.body.last_name;
  const nationalId = req.body.national_id;
  const employType = req.body.employ_type;
  const jobTitleId = req.body.job_title_id;
  const salaryCoeffId = req.body.salary_coefficient_id;
  const birthDate = req.body.birth_date;
  const gender = req.body.gender;
  const marital = req.body.marital_status;
  const address = req.body.address;
  const email = req.body.email;
  const contact = req.body.contact_id;

  Employee.create({
    manager_id: managerId,
    first_name: firstName,
    last_name: lastName,
    national_id: nationalId,
    employ_type: employType,
    job_title_id: jobTitleId,
    salary_coefficient_id: salaryCoeffId,
    birth_date: birthDate,
    gender: gender,
    marital_status: marital,
    address: address,
    email: email,
    phone_contact_id: contact
  })
    .then((employee) => {
      res.status(http.CREATED).json(employee);
    })
    .catch((err) => {
      if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
      next(err);
    })
}

module.exports.updateEmployee = (req, res, next) => {
  const employeeId = req.body.employee_id;
  const managerId = req.body.manager_id;
  const firstName = req.body.first_name;
  const lastName = req.body.last_name;
  const nationalId = req.body.national_id;
  const employType = req.body.employ_type;
  const jobTitleId = req.body.job_title_id;
  const salaryCoeffId = req.body.salary_coefficient_id;
  const birthDate = req.body.birth_date;
  const gender = req.body.gender;
  const marital = req.body.marital_status;
  const address = req.body.address;
  const email = req.body.email;
  const contact = req.body.contact_id;

  Employee.findOne({
    where: {
      employee_id: employeeId
    }
  })
    .then((employee) => {
      if (employee) {
        employee.update({
          manager_id: managerId,
          first_name: firstName,
          last_name: lastName,
          national_id: nationalId,
          employ_type: employType,
          job_title_id: jobTitleId,
          salary_coefficient_id: salaryCoeffId,
          birth_date: birthDate,
          gender: gender,
          marital_status: marital,
          address: address,
          email: email,
          phone_contact_id: contact
        })
          .then((employee) => {
            res.status(http.OK).json(employee);
          })
          .catch((err) => {
            if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
            next(err);
          });
      }
      else {
        res.status(http.NOTFOUND).json("Employee does not exist!");
      }
    })
    .catch((err) => {
      if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
      next(err);
    })
}

module.exports.deleteEmployee = (req, res, next) => {
  Employee.findOne({
    attributes: ["employee_id"],
    where: { employee_id: req.body.employee_id }
  })
    .then(employee => {
      if (!employee) {
        return res.status(http.NOTFOUND).json("Employee does not exist!");
      }

      return employee.destroy();
    })
    .then(deletedEmployee => {
      res.status(http.OK).json(deletedEmployee);
    })
    .catch(err => {
      if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
      next(err);
    })
}