/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('motorcycles', table =>{
        table.increments('motorcycleId');
        table.boolean('sold');
        table.string('image');
        table.string('type');
        table.string('make');
        table.string('model');
        table.integer('year');
        table.integer('price');
        table.integer('mileage');
        table.string('color');
        table.string('condition');
        table.string('location');
        table.timestamp(true, true);
        table.string('description', 500);
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('motorcycles')
};
