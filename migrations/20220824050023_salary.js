/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('salary', (table) => {
        table.increments();
        table.integer("employee_id").unsigned().references("employee.id");
        table.decimal("hourly_rate");
        table.decimal("month_working_hour");//current month
        table.decimal("month_salary"); //current month
        table.decimal("accumulate_salary"); //accumulate
        table.decimal("accumulate_working_hour"); //accumulate
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('salary');
};
