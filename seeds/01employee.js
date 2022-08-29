/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('employee').del()
  await knex('employee').insert([
    { employee_id: 3, department_id: 1, title: 'waiter', salary: 7500, active_status: "on-the-job", start_date: "2021/1/1", end_date: "2022/8/24" },
    { employee_id: 4, department_id: 1, title: 'waiter', salary: 9000, active_status: "on-the-job", start_date: "2021/2/2", end_date: "2022/8/24" },
    { employee_id: 5, department_id: 2, title: 'cook', salary: 9000, active_status: "resigned", start_date: "2021/3/3", end_date: "2022/8/24" },
  ]);
};
