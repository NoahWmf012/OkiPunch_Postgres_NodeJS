/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('attendance', (table) => {
        table.increments();
        table.integer("employee_id").unsigned().references("employee.id");
        table.date("in_date");
        table.date("out_date");
        table.time("in_time");
        table.time("out_time");
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('attendance');
};
