/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('employee_information').del()
  await knex('employee_information').insert([
    { employee_id: 1, fName: 'Ricky', lName: 'Lam', alias: 'Ric', phone_number: 61612828, address: 'Mong Kok', gender: 'male', date_of_birth: '1990/4/4' },
    { employee_id: 2, fName: 'Sam', lName: 'Lee', alias: 'S', phone_number: 67671100, address: 'NT', gender: 'male', date_of_birth: '1990/6/6' },
    { employee_id: 3, fName: 'Lily', lName: 'White', alias: 'Li', phone_number: 67679090, address: 'Tsun Wan', gender: 'female', date_of_birth: '1989/4/10' },
  ]);
};
