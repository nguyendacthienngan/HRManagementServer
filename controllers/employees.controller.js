const db = require("../models");
const sequelize = require("sequelize");
const Employee = db.Employee;
const DetailTeam = db.Re_Employee_Team;
const DetailBenefit = db.Re_Employee_Benefit;
const http = require("../utils/http-status");

module.exports.getAll = (req, res, next) => {
  Employee.findAll(
    {
      include: [
        {
          model: db.JobTitle,
          required: true
        },
        {
          model: db.SalaryCoefficient,
          required: true
        },
        {
          model: db.PhoneNumber,
          required: true
        }
      ],
    }
  )
    .then((users) => {
      // res.status(http.OK).json(users);
      let cnt = 0;
      users.forEach(user => {
        DetailTeam.findAll({
          where: { employee_id: user.id },
          include: [{ model: db.Team, required: true }]
        })
          .then(d => {
            user.involved_teams = [];
            d.forEach(team => {
              user.involved_teams.push({
                team_id: team.team_id,
                team_name: team.Team.team_name,
                team_type: team.Team.team_type,
                manager_id: team.Team.manager_id
              })
            })

            if (cnt === users.length - 1) {
              const finalResults = users.map(employee => {
                return Object.assign({}, {
                  id: employee.id,
                  manager_id: employee.manager_id,
                  first_name: employee.first_name,
                  last_name: employee.last_name,
                  employ_type: employee.employ_type,
                  employee_status: employee.employee_status,
                  job_title: {
                    id: employee.JobTitle.id,
                    title_name: employee.JobTitle.title_name
                  },
                  involved_teams: employee.involved_teams
                });
              });
              res.status(http.OK).json(finalResults);
            }
            else
              cnt++;
          })
          .catch(err => {
            if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
            next(err);
          })
      });
    })
    .catch(err => {
      if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
      next(err);
    });
}

module.exports.getEmployee = (req, res, next) => {
  Employee.findOne({
    include: [
      {
        model: db.JobTitle,
        required: true
      },
      {
        model: db.SalaryCoefficient,
        required: true
      },
      {
        model: db.PhoneNumber,
        required: true
      }
    ],
    where: {
      id: req.params.id
    },
  })
    .then((employee) => {
      if (!employee) {
        return res.status(http.NOTFOUND).json("Employee does not exist!");
      }
      let finalResult = {
        id: employee.id,
        manager_id: employee.manager_id,
        first_name: employee.first_name,
        last_name: employee.last_name,
        national_id: employee.national_id,
        employ_type: employee.employ_type,
        employee_status: employee.employee_status,
        job_title: {
          id: employee.JobTitle.id,
          title_name: employee.JobTitle.title_name
        },
        salary_coefficient: {
          id: employee.SalaryCoefficient.id,
          value: employee.SalaryCoefficient.value
        },
        birth_date: employee.birth_date,
        gender: employee.gender,
        marital_status: employee.marital_status,
        address: employee.address,
        email: employee.email,
        phone_contact: {
          id: employee.PhoneNumber.id,
          emergency_call: employee.PhoneNumber.emergency_call,
          personal_call: employee.PhoneNumber.personal_call
        },
        involved_teams: [],
        benefits: []
      };

      DetailTeam.findAll({
        where: {
          employee_id: employee.id
        },
        include: [
          { model: db.Team, required: true }
        ]
      })
        .then(teams => {
          // console.log(teams);
          teams.forEach(team => {
            finalResult.involved_teams.push({
              team_id: team.team_id,
              team_name: team.Team.team_name,
              team_type: team.Team.team_type,
              manager_id: team.Team.manager_id
            });
          });

          DetailBenefit.findAll({
            where: { employee_id: employee.id },
            include: [{ model: db.Benefit, required: true }]
          })
            .then(benefits => {
              benefits.forEach(b => {
                finalResult.benefits.push({
                  benefit_id: b.Benefit.id,
                  benefit_name: b.Benefit.benefit_name,
                  start_date: b.Benefit.start_date,
                  end_date: b.Benefit.end_date
                });
              });
              res.status(http.OK).json(finalResult);
            })
            .catch((err) => {
              if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
              next(err);
            })
        })
        .catch((err) => {
          if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
          next(err);
        })
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
  const employeeStatus = req.body.employee_status;

  Employee.create({
    manager_id: managerId,
    first_name: firstName,
    last_name: lastName,
    national_id: nationalId,
    employ_type: employType,
    employee_status: employeeStatus,
    job_title_id: jobTitleId,
    salary_coefficient_id: salaryCoeffId,
    birth_date: birthDate,
    gender: gender,
    marital_status: marital,
    address: address,
    email: email,
    phone_contact_id: contact
  })
    .then(employee => {
      // res.status(http.CREATED).json(employee);
      db.Account.create({
        username: email,
        password: "123456",
        employee_id: employee.id
      })
        .then(account => {
          res.status(http.CREATED).json({
            account: account,
            profile: employee
          });
        })
        .catch(err => {
          if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
          next(err);
        })
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
  const contact = req.body.contact;
  const employeeStatus = req.body.employee_status;

  Employee.findOne({
    // attributes: ["id"],
    where: { id: employeeId }
  })
    .then(employee => {
      if (!employee) {
        return res.status(http.NOTFOUND).json("Employee does not exist!");
      }

      employee.update({
        manager_id: managerId,
        first_name: firstName,
        last_name: lastName,
        national_id: nationalId,
        employ_type: employType,
        employee_status: employeeStatus,
        job_title_id: jobTitleId,
        salary_coefficient_id: salaryCoeffId,
        birth_date: birthDate,
        gender: gender,
        marital_status: marital,
        address: address,
        email: email,
      })
        .then(updatedA => {
          console.log(updatedA);
          db.PhoneNumber.findOne({
            where: { id: updatedA.phone_contact_id }
          })
            .then(r => {
              r.update({
                emergency_call: contact.emergency_call,
                personal_call: contact.personal_call
              })
                .then(updatedB => {
                  res.status(http.OK).json({
                    employee: updatedA,
                    contact: updatedB
                  });
                })
                .catch(err => {
                  if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
                  next(err);
                })
            })
            .catch(err => {
              if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
              next(err);
            })
        })
        .catch((err) => {
          if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
          next(err);
        });
    })
    .catch((err) => {
      if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
      next(err);
    });
}

module.exports.deleteEmployee = (req, res, next) => {
  db.Account.findOne({
    where: { employee_id: req.params.id }
  })
    .then(result => {
      if (!result) {
        return res.status(http.NOTFOUND).json("Employee does not exist!");
      }
      Employee.destroy({
        where: { id: result.employee_id }
      })
        .then(r => {
          result.destroy({})
            .then(deleted => {
              res.status(http.OK).json(deleted);
            })
            .catch(err => {
              if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
              next(err);
            })
          // db.Account.destroy({
          //   where: { employee_id: req.params.id }
          // })
          //   .then(() => {
          //     res.status(http.OK).json("deleted");
          //   })
          //   .catch(err => {
          //     if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
          //     next(err);
          //   })
        })
        .catch(err => {
          if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
          next(err);
        })
    })
}