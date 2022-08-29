/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('salary').del()
  await knex('salary').insert([
    { employee_id: 3, hourly_rate: 60, month_working_hour: 50.5, month_salary: 3030 },
    { employee_id: 4, hourly_rate: 65, month_working_hour: 40.5, month_salary: 2632.5 },
    { employee_id: 5, hourly_rate: 85, month_working_hour: 80, month_salary: 3030 }
  ]);
};
