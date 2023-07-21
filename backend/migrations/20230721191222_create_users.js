/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('users', (table)=> {
        table.increments('userId');
        table.boolean('admin');
        table.string('username');
        table.string('password');
        table.string('first_name');
        table.string('last_name');
        table.string('base');
        table.string('favorites');
        table.timestamps(true,true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
};