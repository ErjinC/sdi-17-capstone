/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('listings').del()
  await knex('listings').insert([
    {user_id: 1, car_id: 2}
  ]);
  await knex.raw('SELECT setval(\'listings_id_seq\', (SELECT MAX(listingId) from "listings"));')
};
