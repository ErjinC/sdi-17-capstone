/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('trailers', (table)=> {
        table.increments('trailerId');
        table.boolean('sold');
        table.string('type');
        table.string('description', 500);
        table.string('image');
        table.string('make');
        table.string('model');
        table.integer('year');
        table.integer('price');
        table.integer('length');
        table.string('condition');
        table.string('location');
        table.timestamps(true,true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('trailers')
};
