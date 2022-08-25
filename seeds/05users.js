/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    { username: 'em1', email: 'em1@em1', password: '123', role: 'employee' },
    { username: 'em2', email: 'em2@em2', password: '321', role: 'employee' },
    { username: 'com1', email: 'com1@com1', password: '456', role: 'company' },
    { username: 'com2', email: 'com2@com2', password: '654', role: 'company' },
  ]);
};
