const { pwHash } = require('../helpers.js')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      userId: 1,
      admin: true,
      username: "ben10",
      password: pwHash("test"),
      first_name: "Larry",
      last_name: "Llama",
      base: "Beale AFB",
      favorites: "1,2,3,4,5"
    },
    {
      userId: 2,
      admin: false,
      username: "ChirpyChicken",
      password: pwHash("cluck123"),
      first_name: "Charlie",
      last_name: "Chicken",
      base: "Edwards AFB",
      favorites: "2,5,8,11,14"
    },
    {
      userId: 3,
      admin: false,
      username: "BouncyBear",
      password: pwHash("bear123"),
      first_name: "Bobby",
      last_name: "Bear",
      base: "Andrews AFB",
      favorites: "3,6,9,12,15"
    },
    {
      userId: 4,
      admin: false,
      username: "JumpingJaguar",
      password: pwHash("jaguar123"),
      first_name: "Jerry",
      last_name: "Jaguar",
      base: "Dover AFB",
      favorites: "4,8,12,16,20"
    },
    {
      userId: 5,
      admin: false,
      username: "ZestyZebra",
      password: pwHash("zebra123"),
      first_name: "Zachary",
      last_name: "Zebra",
      base: "Ellsworth AFB",
      favorites: "5,10,15,20"
    },
    {
      userId: 6,
      admin: true,
      username: "QuirkyQuokka",
      password: pwHash("quokka123"),
      first_name: "Quincy",
      last_name: "Quokka",
      base: "F. E. Warren AFB",
      favorites: "6,12,18"
    },
    {
      userId: 7,
      admin: false,
      username: "PurringPuma",
      password: pwHash("puma123"),
      first_name: "Peter",
      last_name: "Puma",
      base: "Goodfellow AFB",
      favorites: "7,14",
    },
    {
      userId: 8,
      admin: false,
      username: "KickingKangaroo",
      password: pwHash("kangaroo123"),
      first_name: "Kyle",
      last_name: "Kangaroo",
      base: "Hanscom AFB",
      favorites: "1,8,9,10,11"
    },
    {
      userId: 9,
      admin: false,
      username: "InquisitiveIguana",
      password: pwHash("iguana123"),
      first_name: "Igor",
      last_name: "Iguana",
      base: "Hill AFB",
      favorites: "2,5,7,9,11"
    },
    {
      userId: 10,
      admin: false,
      username: "HonkingHippopotamus",
      password: pwHash("hippo123"),
      first_name: "Henry",
      last_name: "Hippopotamus",
      base: "Joint Base Andrews",
      favorites: "3,6,9,12,15"
    },
    {
      userId: 11,
      admin: false,
      username: "GarglingGorilla",
      password: pwHash("gorilla123"),
      first_name: "Gary",
      last_name: "Gorilla",
      base: "Joint Base Anacostia-Bolling",
      favorites: "4,8,12,16,20"
    },
    {
      userId: 12,
      admin: false,
      username: "FriskyFerret",
      password: pwHash("ferret123"),
      first_name: "Frank",
      last_name: "Ferret",
      base: "Joint Base Charleston",
      favorites: "5,10,15,20"
    },
    {
      userId: 13,
      admin: false,
      username: "EnergeticElephant",
      password: pwHash("elephant123"),
      first_name: "Edward",
      last_name: "Elephant",
      base: "Joint Base Langley-Eustis",
      favorites: "6,12,18"
    },
    {
      userId: 14,
      admin: false,
      username: "DancingDingo",
      password: pwHash("dingo123"),
      first_name: "Dennis",
      last_name: "Dingo",
      base: "Joint Base Lewis-McChord",
      favorites: "7,14"
    },
    {
      userId: 15,
      admin: false,
      username: "CuddlyCoyote",
      password: pwHash("coyote123"),
      first_name: "Clarence",
      last_name: "Coyote",
      base: "Joint Base McGuire-Dix-Lakehurst",
      favorites: "1,8,9,10,11"
    },
    {
      userId: 16,
      admin: true,
      username: "BumblingBison",
      password: pwHash("bison123"),
      first_name: "Bernard",
      last_name: "Bison",
      base: "Joint Base Pearl Harbor-Hickam",
      favorites: "2,5,7,9,11"
    },
    {
      userId: 17,
      admin: false,
      username: "AstonishedAardvark",
      password: pwHash("aardvark123"),
      first_name: "Albert",
      last_name: "Aardvark",
      base: "Joint Base San Antonio",
      favorites: "3,6,9,12,15"
    },
    {
      userId: 18,
      admin: false,
      username: "WhistlingWalrus",
      password: pwHash("walrus123"),
      first_name: "Walter",
      last_name: "Walrus",
      base: "Keesler AFB",
      favorites: "4,8,12,16,20"
    },
    {
      userId: 19,
      admin: false,
      username: "VexedVulture",
      password: pwHash("vulture123"),
      first_name: "Victor",
      last_name: "Vulture",
      base: "Kirtland AFB",
      favorites: "5,10,15,20"
    },
    {
      userId: 20,
      admin: false,
      username: "UnusualUnicorn",
      password: pwHash("unicorn123"),
      first_name: "Ulysses",
      last_name: "Unicorn",
      base: "Lackland AFB",
      favorites: "6,12,18"
    }
    
  ]);
  await knex.raw("ALTER SEQUENCE \"users_userId_seq\" RESTART WITH 21;")
};


// In the format below, please give me a list of 20 objects in json format for a KNEX seed file. These will represent users for a website. Show all 20 objects.

// userId must increment by 1
// admin can be true or false. Only 3 of the 20 should be true
// username can be any simple username that is funny
// password can be any very simple password
// first_name can be any funny first name
// last_name can be any funny last name
// base can be any air force base
// favorites can be anything realistic for the year
// favorites can be numbers in a string format. For example "1,6,9,2". No more than 5 numbers, and at least 1. No number should be above 20

// {
//     userId: 1,
//     admin: true,
//     username: "kevin",
//     password: pwHash("test",
//     first_name: "Kevin",
//     last_name: "Cagle",
//     base: "Beale AFB",
//     favorites: "1,2,3,4",
//   }
