/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('bases').del()
  await knex('bases').insert([
    {baseId: 1, name: 'Patrick SFB'},
    {baseId: 2, name: 'Buckley SFB'},
    {baseId: 3, name: 'Peterson SFB'},
    {baseId: 4, name: 'Schriever SFB'},
    {baseId: 5, name: 'Los Angeles SFB'},
    {baseId: 6, name: 'Vandenberg SFB'},
    {baseId: 7, name: 'Beale AFB'},
    {baseId: 8, name: 'Travis AFB'},
    {baseId: 9, name: 'MacDill AFB'},
    {baseId: 10, name: 'Hickam AFB'},
    {baseId: 11, name: 'Scott AFB'},
    {baseId: 12, name: 'Andrews AFB'},
    {baseId: 13, name: 'Nellis AFB'},
    {baseId: 14, name: 'Cannon AFB'},
    {baseId: 15, name: 'Tinker AFB'},
    {baseId: 16, name: 'Shaw AFB'},
    {baseId: 17, name: 'Hill AFB'},
    {baseId: 18, name: 'Kadena AFB'},
    {baseId: 19, name: 'Osan AFB'},
    {baseId: 20, name: 'Aviano AFB'}
  ]);

  await knex.raw("ALTER SEQUENCE \"trailers_trailerId_seq\" RESTART WITH 21;")
};
