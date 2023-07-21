/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("listings", table => {
    table.increments("id").primary()
    table.integer("user_id")
    table.foreign("user_id").references("userId").inTable("users").onDelete('cascade');
    table.integer("car_id")
    table.foreign("car_id").references("carId").inTable("cars").onDelete('cascade');
    table.integer("boat_id")
    table.foreign("boat_id").references("boatId").inTable("boats").onDelete('cascade');
    table.integer("rv_id")
    table.foreign("rv_id").references("rvId").inTable("rvs").onDelete('cascade');
    table.integer("motorcycle_id")
    table.foreign("motorcycle_id").references("motorcycleId").inTable("motorcycles").onDelete('cascade');
    table.integer("trailer_id")
    table.foreign("trailer_id").references("trailerId").inTable("trailers").onDelete('cascade');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('listings', table => {
        table.dropForeign('user_id')
        table.dropForeign('car_id')
        table.dropForeign('boat_id')
        table.dropForeign('rv_id')
        table.dropForeign('motorcycle_id')
        table.dropForeign('trailer_id')
      })
      .then(function() {
         return knex.schema.dropTableIfExists('listings')
      });
};
