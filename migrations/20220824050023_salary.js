/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('salary', (table) => {
        table.increments();
        table.integer("employee_id").unsigned().references("employee.id");
        table.decimal("hourly_rate");
        table.decimal("total_working_hour");
        table.decimal("total_salary")
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('salary');
};
