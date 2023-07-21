/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('reviews', (table)=> {
        table.increments('reviewId').primary();
        table.integer('rating');
        table.string('details', 500);
        table.integer('reviewer_id');
        table.integer('user_id');
        table.timestamps(true, true)

        table.foreign('reviewer_id').references('userId').inTable('users').onDelete('cascade');
        table.foreign('user_id').references('userId').inTable('users').onDelete('cascade');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('reviews', table => {
        table.dropForeign('user_id')
        table.dropForeign('reviewer_id')
      })
      .then(function() {
        return knex.schema.dropTableIfExists('reviews')
      });
};
