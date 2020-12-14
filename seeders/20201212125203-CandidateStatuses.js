'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert('CandidateStatuses', [{
        status_name: "Chưa được duyệt",
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
      status_name: "Pass CV",
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      status_name: "Failed CV",
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      status_name: "Đăng ký PV",
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      status_name: "Chưa check in PV",
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      status_name: "Đã check in PV",
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      status_name: "Không check in PV",
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      status_name: "Pass PV",
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      status_name: "Failed PV",
      createdAt: new Date(),
      updatedAt: new Date()
     },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('CandidateStatuses', null, {});
  }
};
