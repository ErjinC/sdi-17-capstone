/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('rvs', (table)=> {
        table.increments('rvId');
        table.boolean('sold');
        table.string('image')
        table.string('type');
        table.string('make');
        table.string('model');
        table.integer('year');
        table.integer('price');
        table.integer('mileage');
        table.string('condition');
        table.string('location');
        table.string('sleeps')
        table.string('weight')
        table.string('length')
        table.string('description', 500);
        table.timestamps(true, true)
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('rvs')
};
