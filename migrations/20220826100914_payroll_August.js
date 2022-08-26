/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('payroll_august', (table) => {
        table.increments();
        table.integer("employee_id").unsigned().references("employee.id");
        table.integer("attendance_id");
        table.integer("salary_id");
        table.decimal("daily_salary");
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('payroll_august');
};
