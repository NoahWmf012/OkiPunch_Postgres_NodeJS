/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('employee_information', (table) => {
        table.increments("employee_id")
        table.string("first_name");
        table.string("last_name");
        table.string("alias");
        table.integer("phone_number");
        table.string("address");
        table.enu('gender', ['male', 'female'])
        table.date("date_of_birth");
        table.binary("image_icon");
        table.timestamps(true, true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('employee_information');
};
