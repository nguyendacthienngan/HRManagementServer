const db = require("../models");
const sequelize = require("sequelize");
const Candidate = db.Candidate;
const http = require("../utils/http-status");
const interviewController = require("../controllers/interviews.controller")

module.exports.getAll = (req, res, next) => {
  Candidate.findAll(
    {
      attributes: ["id", "first_name", "last_name", "email",
        "candidate_state", "position", "phone_no"],
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

module.exports.getCheckinCandidates = (req, res, next) => {
  db.Re_Interview_Candidate.findAll({
    include: [
      {
        model: db.Interview, required: true
      },
      {
        model: db.Candidate, required: true
      }
    ]
  })
    .then(r => {
      const results = []
      let cnt = 0
      r.forEach(tmp => {
        interviewController.getFromID(tmp.interview_id)
          .then(r2 => {
            results.push({
              candidate_id: tmp.candidate_id,
              interview_id: tmp.interview_id,
              interview: r2,
              candidate: tmp.Candidate
            })
            cnt++
            if (cnt === r.length) 
              res.status(http.OK).json(results)
          })
          .catch(err => {
            if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR
            next(err)
          })
      })
    })
    .catch(err => {
      if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR
      next(err)
    })
}

module.exports.getCandidate = (req, res, next) => {
  Candidate.findOne({
    attributes: [
      "id", "first_name", "last_name", "national_id",
      "employ_type", "position",
      "birth_date", "gender", "email",
      "candidate_state", "phone_no"
    ],
    where: {
      id: req.params.id
    }
  })
    .then((employee) => {
      if (!employee) {
        return res.status(http.NOTFOUND).json("Candidate does not exist!");
      }
      res.status(http.OK).json(employee);
    })
    .catch((err) => {
      if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
      next(err);
    })
}

module.exports.createCandidate = (req, res, next) => {
  const firstName = req.body.first_name;
  const lastName = req.body.last_name;
  const nationalId = req.body.national_id;
  const employType = req.body.employ_type;
  const position = req.body.position;
  const birthDate = req.body.birth_date;
  const gender = req.body.gender;
  const email = req.body.email;
  const status_id = req.body.candidate_status;
  const contact = req.body.contact;

  Candidate.create({
    first_name: firstName,
    last_name: lastName,
    national_id: nationalId,
    employ_type: employType,
    position: position,
    birth_date: birthDate,
    gender: gender,
    candidate_state: status_id,
    email: email,
    phone_no: contact
  })
    .then(result => {
      res.status(http.CREATED).json(result);
    })
    .catch((err) => {
      if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
      next(err);
    })
}

module.exports.updateCandidate = (req, res, next) => {
  const candidateId = req.body.candidate_id;
  const firstName = req.body.first_name;
  const lastName = req.body.last_name;
  const nationalId = req.body.national_id;
  const employType = req.body.employ_type;
  const position = req.body.position;
  const birthDate = req.body.birth_date;
  const gender = req.body.gender;
  const status = req.body.candidate_status;
  const email = req.body.email;
  const contact = req.body.contact;

  Candidate.findOne({
    attributes: ["id"],
    where: { id: candidateId }
  })
    .then(candidate => {
      if (!candidate) {
        return res.status(http.NOTFOUND).json("Candidate does not exist!");
      }

      candidate.update({
        first_name: firstName,
        last_name: lastName,
        national_id: nationalId,
        employ_type: employType,
        position: position,
        birth_date: birthDate,
        gender: gender,
        candidate_state: status,
        email: email,
        phone_no: contact
      })
        .then(updated => {
          res.status(http.OK).json(updated);
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

module.exports.deleteCandidate = (req, res, next) => {
  Candidate.findOne({
    attributes: ["id"],
    where: { id: req.params.id }
  })
    .then(result => {
      if (!result) {
        return res.status(http.NOTFOUND).json("Candidate does not exist!");
      }

      result.destroy()
        .then(deleted => {
          res.status(http.OK).json(deleted);
        })
        .catch(err => {
          if (!err.status) err.statusCode = http.INTERNAL_SERVER_ERROR;
          next(err);
        })
    })
}