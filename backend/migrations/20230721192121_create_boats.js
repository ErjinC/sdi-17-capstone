/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('boats', function (table) {
    table.increments('boatId');
    table.boolean('sold');
    table.string('type');
    table.string('image');
    table.string('make');
    table.string('model');
    table.integer('year');
    table.integer('price');
    table.integer('hours');
    table.string('condition');
    table.string('location');
    table.string('description', 500);
    table.timestamps(true, true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('boats')
};
