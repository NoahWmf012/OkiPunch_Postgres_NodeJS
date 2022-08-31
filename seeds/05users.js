/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    { username: 'com', email: 'com@com', password: '$2b$10$2Bhq/HS5giXkgdcVCvsmH.ShllE1zPLjEM7D8Q9eU82nC9BbZzTFu', role: 'company' }, //pw:com
    { username: 'com1', email: 'com1@com1', password: '$2b$10$vhh5ERn8RHmyufII8QoPu.ItzCxSf.y2DMwGQQAxp8QQUpGzXh1gS', role: 'company' }, //pw:com1
    { username: 'em', email: 'em@em', password: '$2b$10$1pquiziPwdCvHGb.fCIcIehbSd4bBIE4NprPfy685Z9Zdlyc4E/dK', role: 'employee' }, //pw:em, employee_id: 1
    { username: 'em1', email: 'em1@em1', password: '$2b$10$/hpnP6h1Fx59KjYOGDMGvOSj.lW3ytiJ6uYrxDVB7SgUojdaVsXQS', role: 'employee' }, //pw:em1, employee_id: 2
  ]);
};
