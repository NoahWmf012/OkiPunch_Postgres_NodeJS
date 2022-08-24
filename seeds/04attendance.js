/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('attendance').del()
  await knex('attendance').insert([
    { employee_id: 1, in_date: '2022/8/20', out_date: '2022/8/20', in_time: '08:59:50', out_time: '18:00:00' },
    { employee_id: 1, in_date: '2022/8/21', out_date: '2022/8/21', in_time: '09:10:00', out_time: '18:00:01' },
    { employee_id: 2, in_date: '2022/8/20', out_date: '2022/8/20', in_time: '08:59:55', out_time: '18:00:10' },
    { employee_id: 2, in_date: '2022/8/21', out_date: '2022/8/21', in_time: '08:59:59', out_time: '17:50:10' },
    { employee_id: 3, in_date: '2022/8/20', out_date: '2022/8/20' },
    { employee_id: 3, in_date: '2022/8/21', out_date: '2022/8/21', in_time: '08:50:50', out_time: '08:50:50' },
  ]);
};
