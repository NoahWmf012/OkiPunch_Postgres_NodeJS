/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('salary', (table) => {
        table.increments();
        table.integer("employee_id").unsigned().references("employee.id");
        table.integer("hourly_rate");
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('salary');
};
