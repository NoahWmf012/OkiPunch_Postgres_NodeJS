/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('payroll_september').del()
  await knex('payroll_september').insert([
    { employee_id: 3, attendance_id: 7, salary_id: 1, daily_salary: 540 },
    { employee_id: 4, attendance_id: 8, salary_id: 2, daily_salary: 312 },
    { employee_id: 5, attendance_id: 9, salary_id: 3, daily_salary: 773.5 }
  ]);
};
