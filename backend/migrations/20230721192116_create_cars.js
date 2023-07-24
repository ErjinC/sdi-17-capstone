/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('cars', function (table) {
    table.increments('carId');
    table.boolean('sold');
    table.string('type');
    table.string('make');
    table.string('model');
    table.integer('year');
    table.integer('price');
    table.integer('mileage');
    table.string('color');
    table.string('transmission');
    table.string('condition');
    table.string('location');
    table.string('description', 500);
    table.timestamps(true, true)
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars')
};
