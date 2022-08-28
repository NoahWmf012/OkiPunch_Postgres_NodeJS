/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('employee_information').del()
  await knex('employee_information').insert([
    { employee_id: 3, first_name: 'Rajesh', last_name: 'Lam', alias: 'Ricky', phone_number: 61612828, address: 'Mong Kok', gender: 'male', date_of_birth: '1990/4/4' },
    { employee_id: 4, first_name: 'Pallavi', last_name: 'Lee', alias: 'Sam', phone_number: 67671100, address: 'NT', gender: 'male', date_of_birth: '1990/6/6' },
    { employee_id: 5, first_name: 'Kirti', last_name: 'White', alias: 'Lily', phone_number: 67679090, address: 'Tsun Wan', gender: 'female', date_of_birth: '1989/4/10' },
  ]);
};
