/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('payroll_august').del()
  await knex('payroll_august').insert([
    { employee_id: 3, attendance_id: 1, salary_id: 1, daily_salary: 540 },
    { employee_id: 3, attendance_id: 2, salary_id: 1, daily_salary: 520 },
    { employee_id: 4, attendance_id: 3, salary_id: 2, daily_salary: 540 },
    { employee_id: 4, attendance_id: 4, salary_id: 2, daily_salary: 520 },
    { employee_id: 5, attendance_id: 5, salary_id: 3, daily_salary: 0 },
    { employee_id: 5, attendance_id: 6, salary_id: 3, daily_salary: 850 }
  ]);
};
