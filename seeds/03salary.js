/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('salary').del()
  await knex('salary').insert([
    { employee_id: 1, hourly_rate: 60 },
    { employee_id: 2, hourly_rate: 65 },
    { employee_id: 3, hourly_rate: 85 }
  ]);
};
