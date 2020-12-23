'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert('Employees', [{
       manager_id: null,
       first_name: 'Ngân',
       last_name: 'Nguyễn',
       national_id: '079300001111',
       employ_type: 1,
       job_title_id : 3,
       salary_coefficient_id : 3,
       birth_date: new Date(2000,15,5),
       gender: 0,
       marital_status: 0,
       address: '1 Nguyễn Kiệm Quận Gò Vấp',
       email: 'ngan@gmail.com',
       phone_contact_id: 1,
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
        manager_id: null,
        first_name: 'Bách',
        last_name: 'Nguyễn',
        national_id: '079300002222',
        employ_type: 1,
        job_title_id : 2,
        salary_coefficient_id : 2,
        birth_date: new Date(2000,11,11),
        gender: 1,
        marital_status: 0,
        address: '1 Võ Văn Ngân, Quận Thủ Đức',
        email: 'bach@gmail.com',
        phone_contact_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
     },
     {
      manager_id: null,
      first_name: 'Dung',
      last_name: 'Chung',
      national_id: '079300003333',
      employ_type: 0,
      job_title_id : 4,
      salary_coefficient_id : 4,
      birth_date: new Date(2000,3,2),
      gender: 0,
      marital_status: 0,
      address: '100 Nguyễn Trãi, Quận 5',
      email: 'don@gmail.com',
      phone_contact_id: 3,
      createdAt: new Date(),
      updatedAt: new Date()
   },
     {
      manager_id: null,
      first_name: 'Thi',
      last_name: 'Chương',
      national_id: '079300004444',
      employ_type: 0,
      job_title_id : 1,
      salary_coefficient_id : 1,
      birth_date: new Date(2000,4,3),
      gender: 1,
      marital_status: 1,
      address: '100 Tân Kỳ Tân Quý, P. Bình Hưng Hòa, Q.Bình Tân',
      email: 'chuong@gmail.com',
      phone_contact_id: 4,
      createdAt: new Date(),
      updatedAt: new Date()
   }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Employees', null, {});
  }
};
