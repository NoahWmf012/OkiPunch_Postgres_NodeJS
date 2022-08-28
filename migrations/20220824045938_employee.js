/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('employee', (table) => {
        table.increments();
        table.integer("department_id");
        table.string("title");
        table.decimal("salary");
        table.string("active_status"); 
        table.date("start_date");
        table.date("end_date");
        table.timestamps(true, true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('employee');
};
