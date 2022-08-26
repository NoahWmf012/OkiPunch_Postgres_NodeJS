/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('salary').del()
  await knex('salary').insert([
    { employee_id: 1, hourly_rate: 60, total_working_hour: 50.5, total_salary: 3030 },
    { employee_id: 2, hourly_rate: 65, total_working_hour: 40.5, total_salary: 2632.5 },
    { employee_id: 3, hourly_rate: 85, total_working_hour: 80, total_salary: 6800 }
  ]);
};
