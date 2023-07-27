/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('trailers').del()
  await knex('trailers').insert([
    {
      trailerId: 1,
      sold: false,
      type: "flatbed",
      make: "Carry-On Trailer",
      model: "Wood Floor Utility",
      year: 2008,
      price: 1200,
      length: 14,
      image: "https://placekitten.com/500/300",
      condition: "good",
      location: "Beale AFB",
      description: "Garage kept. No issues."
    },
    {
      trailerId: 2,
      sold: false,
      type: "enclosed",
      make: "Haulmark",
      model: "Transport",
      year: 2010,
      price: 3000,
      length: 16,
      image: "https://placekitten.com/500/300",
      condition: "excellent",
      location: "Edwards AFB",
      description: "Like new. Barely used."
    },
    {
      trailerId: 3,
      sold: false,
      type: "flatbed",
      make: "PJ Trailers",
      model: "Car Hauler",
      year: 2015,
      price: 2500,
      length: 18,
      image: "https://placekitten.com/500/300",
      condition: "good",
      location: "Andrews AFB",
      description: "Minor rust. Fully functional."
    },
    {
      trailerId: 4,
      sold: false,
      type: "enclosed",
      make: "Cargo Express",
      model: "Ex DLX",
      year: 2016,
      price: 3500,
      length: 12,
      image: "https://placekitten.com/500/300",
      condition: "good",
      location: "Barksdale AFB",
      description: "Minor scratches. Well kept."
    },
    {
      trailerId: 5,
      sold: false,
      type: "flatbed",
      make: "Big Tex Trailers",
      model: "70CH",
      year: 2019,
      price: 3000,
      length: 20,
      image: "https://placekitten.com/500/300",
      condition: "excellent",
      location: "Eglin AFB",
      description: "Excellent condition. Barely used."
    },
    {
      trailerId: 6,
      sold: false,
      type: "enclosed",
      make: "Continental Cargo",
      model: "Auto Master",
      year: 2021,
      price: 7000,
      length: 24,
      image: "https://placekitten.com/500/300",
      condition: "excellent",
      location: "Elmendorf AFB",
      description: "Like new, minimal use."
    },
    {
      trailerId: 7,
      sold: false,
      type: "flatbed",
      make: "Diamond C Trailers",
      model: "LPX",
      year: 2017,
      price: 4000,
      length: 22,
      image: "https://placekitten.com/500/300",
      condition: "good",
      location: "Cannon AFB",
      description: "Minor wear and tear. Fully functional."
    },
    {
      trailerId: 8,
      sold: false,
      type: "enclosed",
      make: "Pace American",
      model: "Journey",
      year: 2020,
      price: 5000,
      length: 16,
      image: "https://placekitten.com/500/300",
      condition: "excellent",
      location: "Davis-Monthan AFB",
      description: "Like new, minimal use."
    },
    {
      trailerId: 9,
      sold: false,
      type: "flatbed",
      make: "Doolittle Trailer",
      model: "Utility",
      year: 2018,
      price: 2000,
      length: 12,
      image: "https://placekitten.com/500/300",
      condition: "good",
      location: "Buckley AFB",
      description: "Normal wear for age. Fully functional."
    },
    {
      trailerId: 10,
      sold: false,
      type: "enclosed",
      make: "Interstate",
      model: "LoadRunner",
      year: 2021,
      price: 6000,
      length: 20,
      image: "https://placekitten.com/500/300",
      condition: "excellent",
      location: "Dover AFB",
      description: "Excellent condition, minimal use."
    },
    {
      trailerId: 11,
      sold: false,
      type: "flatbed",
      make: "Bri-Mar",
      model: "DTR",
      year: 2017,
      price: 2500,
      length: 14,
      image: "https://placekitten.com/500/300",
      condition: "excellent",
      location: "Dyess AFB",
      description: "Excellent condition, well maintained."
    },
    {
      trailerId: 12,
      sold: false,
      type: "enclosed",
      make: "Legend Trailers",
      model: "Deluxe",
      year: 2019,
      price: 4500,
      length: 18,
      image: "https://placekitten.com/500/300",
      condition: "good",
      location: "Eielson AFB",
      description: "Good condition, regularly serviced."
    },
    {
      trailerId: 13,
      sold: false,
      type: "flatbed",
      make: "Karavan",
      model: "Utility",
      year: 2016,
      price: 1500,
      length: 10,
      image: "https://placekitten.com/500/300",
      condition: "good",
      location: "F.E. Warren AFB",
      description: "Some rust, but fully functional."
    },
    {
      trailerId: 14,
      sold: false,
      type: "enclosed",
      make: "Wells Cargo",
      model: "Road Force",
      year: 2020,
      price: 5500,
      length: 16,
      image: "https://placekitten.com/500/300",
      condition: "good",
      location: "Fairchild AFB",
      description: "Regularly serviced, good condition."
    },
    {
      trailerId: 15,
      sold: false,
      type: "flatbed",
      make: "Look Trailers",
      model: "Vision",
      year: 2022,
      price: 5000,
      length: 14,
      image: "https://placekitten.com/500/300",
      condition: "excellent",
      location: "Fort George G. Meade",
      description: "Like new, minimal use."
    },
    {
      trailerId: 16,
      sold: false,
      type: "enclosed",
      make: "Sundowner Trailers",
      model: "Cargo",
      year: 2018,
      price: 4500,
      length: "20",
      image: "https://placekitten.com/500/300",
      condition: "good",
      location: "Goodfellow AFB",
      description: "Good condition, regular maintenance."
    },
    {
      trailerId: 17,
      sold: false,
      type: "flatbed",
      make: "Triton Trailers",
      model: "Aut Series",
      year: 2017,
      price: 3500,
      length: 16,
      image: "https://placekitten.com/500/300",
      condition: "good",
      location: "Hanscom AFB",
      description: "Good condition, minor wear."
    },
    {
      trailerId: 18,
      sold: false,
      type: "enclosed",
      make: "Aluma",
      model: "AE612",
      year: 2021,
      price: 7000,
      length: 12,
      image: "https://placekitten.com/500/300",
      condition: "excellent",
      location: "Hill AFB",
      description: "Like new, minimal use."
    },
    {
      trailerId: 19,
      sold: false,
      type: "flatbed",
      make: "EZ Loader",
      model: "Adjustable Boat",
      year: 2019,
      price: 2500,
      length: 20,
      image: "https://placekitten.com/500/300",
      condition: "excellent",
      location: "Holloman AFB",
      description: "Barely used, excellent condition."
    },
    {
      trailerId: 20,
      sold: false,
      type: "enclosed",
      make: "Featherlite",
      model: "Recreational",
      year: 2020,
      price: 6500,
      length: 24,
      image: "https://placekitten.com/500/300",
      condition: "excellent",
      location: "Hurlburt Field",
      description: "Like new, minimal use."
    }
    
  ]);
  // await knex.raw('SELECT setval(\'trailers_trailerId_seq\', (SELECT MAX(trailerId) from "trailers"));')
  await knex.raw("ALTER SEQUENCE \"trailers_trailerId_seq\" RESTART WITH 21;")
};

// In the format below, please give me a list of 20 objects in json format for a KNEX seed file. These will represent boat listings for a website. Show me all 20.

// trailerId must increment by 1
// sold must be false
// image must be an empty string
// type can be enclosed or flatbed
// make can be any trailer manufacturer
// model can be any model craft from that manufacturer
// year can be any year trailers were made
// price can be anything realistic for a trailer
// length can be anything realistic for the length of a trailer
// condition can be excellent, good, or poor
// location can be any air force base
// description can be a description of the condition of the watercraft

// {
//     trailerId: 1,
//     sold: false,
//     image: '',
//     type: "flatbed",
//     make: "Carry-On Trailer",
//     model: "Wood Floor Utility",
//     year: 2008,
//     price: 1200,
//     length: "14",
//     condition: "good",
//     location: "Beale AFB",
//     description: "garage kept. no issues."
//   }
