/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('boats').del()
  await knex('boats').insert([
    {
      boatId: 1,
      sold: false,
      type: "boat",
      make: "Sea Ray",
      model: "Sundancer 260",
      year: 2010,
      price: 40000,
      hours: 300,
      image: "https://placekitten.com/500/300",
      condition: "good",
      location: "Beale AFB",
      description: "Bent propeller. Runs well. Needs new canopy."
    },
    {
      boatId: 2,
      sold: false,
      type: "jet ski",
      make: "Yamaha",
      model: "WaveRunner VX",
      year: 2018,
      price: 10000,
      hours: 50,
      image: "https://placekitten.com/500/300",
      condition: "excellent",
      location: "Edwards AFB",
      description: "Excellent condition. Rarely used."
    },
    {
      boatId: 3,
      sold: false,
      type: "boat",
      make: "Boston Whaler",
      model: "230 Outrage",
      year: 2015,
      price: 70000,
      hours: 200,
      image: "https://placekitten.com/500/300",
      condition: "good",
      location: "Andrews AFB",
      description: "Some scratches on hull. Engine in good condition."
    },
    {
      boatId: 4,
      sold: false,
      type: "jet ski",
      make: "Sea-Doo",
      model: "Spark Trixx",
      year: 2020,
      price: 7000,
      hours: 30,
      image: "https://placekitten.com/500/300",
      condition: "excellent",
      location: "Barksdale AFB",
      description: "Like new, hardly used."
    },
    {
      boatId: 5,
      sold: false,
      type: "boat",
      make: "MasterCraft",
      model: "XStar",
      year: 2019,
      price: 130000,
      hours: 100,
      image: "https://placekitten.com/500/300",
      condition: "excellent",
      location: "Eglin AFB",
      description: "Excellent condition. Great for wakeboarding."
    },
    {
      boatId: 6,
      sold: false,
      type: "jet ski",
      make: "Kawasaki",
      model: "Jet Ski Ultra 310LX",
      year: 2021,
      price: 18000,
      hours: 20,
      image: "https://placekitten.com/500/300",
      condition: "excellent",
      location: "Elmendorf AFB",
      description: "Almost new, great condition."
    },
    {
      boatId: 7,
      sold: false,
      type: "boat",
      make: "Grady-White",
      model: "Freedom 275",
      year: 2016,
      price: 110000,
      hours: 250,
      image: "https://placekitten.com/500/300",
      condition: "good",
      location: "Cannon AFB",
      description: "Minor wear and tear. Engine runs great."
    },
    {
      boatId: 8,
      sold: false,
      type: "jet ski",
      make: "Sea-Doo",
      model: "RXP-X 300",
      year: 2022,
      price: 15000,
      hours: 15,
      image: "https://placekitten.com/500/300",
      condition: "excellent",
      location: "Davis-Monthan AFB",
      description: "Like new, minimal use."
    },
    {
      boatId: 9,
      sold: false,
      type: "boat",
      make: "Chaparral",
      model: "Sunesta 244",
      year: 2014,
      price: 50000,
      hours: 300,
      image: "https://placekitten.com/500/300",
      condition: "good",
      location: "Buckley AFB",
      description: "Normal wear for age, engine in good condition."
    },
    {
      boatId: 10,
      sold: false,
      type: "jet ski",
      make: "Yamaha",
      model: "FX Cruiser SVHO",
      year: 2021,
      price: 17000,
      hours: 30,
      image: "https://placekitten.com/500/300",
      condition: "excellent",
      location: "Dover AFB",
      description: "Excellent condition, minimal use."
    },
    {
      boatId: 11,
      sold: false,
      type: "boat",
      make: "Cobalt",
      model: "R5",
      year: 2017,
      price: 85000,
      hours: 150,
      image: "https://placekitten.com/500/300",
      condition: "excellent",
      location: "Dyess AFB",
      description: "Excellent condition, well maintained."
    },
    {
      boatId: 12,
      sold: false,
      type: "jet ski",
      make: "Sea-Doo",
      model: "GTX 155",
      year: 2018,
      price: 12000,
      hours: 60,
      image: "https://placekitten.com/500/300",
      condition: "good",
      location: "Eielson AFB",
      description: "Good condition, regularly serviced."
    },
    {
      boatId: 13,
      sold: false,
      type: "boat",
      make: "Bayliner",
      model: "VR5 Bowrider",
      year: 2016,
      price: 30000,
      hours: 200,
      image: "https://placekitten.com/500/300",
      condition: "good",
      location: "F.E. Warren AFB",
      description: "Some scratches, engine in good condition."
    },
    {
      boatId: 14,
      sold: false,
      type: "jet ski",
      make: "Kawasaki",
      model: "Jet Ski STX-15F",
      year: 2019,
      price: 10000,
      hours: 40,
      image: "https://placekitten.com/500/300",
      condition: "good",
      location: "Fairchild AFB",
      description: "Regularly serviced, good condition."
    },
    {
      boatId: 15,
      sold: false,
      type: "boat",
      make: "Formula",
      model: "310 Bowrider",
      year: 2018,
      price: 150000,
      hours: 120,
      image: "https://placekitten.com/500/300",
      condition: "excellent",
      location: "Goodfellow AFB",
      description: "Excellent condition, minimal use."
    },
    {
      boatId: 16,
      sold: false,
      type: "jet ski",
      make: "Yamaha",
      model: "EX Deluxe",
      year: 2020,
      price: 9000,
      hours: 50,
      image: "https://placekitten.com/500/300",
      condition: "excellent",
      location: "Hanscom AFB",
      description: "Like new, minimal use."
    },
    {
      boatId: 17,
      sold: false,
      type: "boat",
      make: "Regal",
      model: "26 Express",
      year: 2017,
      price: 85000,
      hours: 200,
      image: "https://placekitten.com/500/300",
      condition: "excellent",
      location: "Hill AFB",
      description: "Excellent condition, well maintained."
    },
    {
      boatId: 18,
      sold: false,
      type: "jet ski",
      make: "Sea-Doo",
      model: "Wake Pro 230",
      year: 2022,
      price: 18000,
      hours: 20,
      image: "https://placekitten.com/500/300",
      condition: "excellent",
      location: "Holloman AFB",
      description: "Like new, minimal use."
    },
    {
      boatId: 19,
      sold: false,
      type: "boat",
      make: "Malibu",
      model: "24 MXZ",
      year: 2020,
      price: 140000,
      hours: 100,
      image: "https://placekitten.com/500/300",
      condition: "excellent",
      location: "Keesler AFB",
      description: "Excellent condition, great for wakeboarding."
    },
    {
      boatId: 20,
      sold: false,
      type: "jet ski",
      make: "Yamaha",
      model: "SuperJet",
      year: 2021,
      price: 9500,
      hours: 30,
      image: "https://placekitten.com/500/300",
      condition: "excellent",
      location: "Kirtland AFB",
      description: "Like new, minimal use."
    }
    
  ]);
  // await knex.raw('SELECT setval(\'boats_boatId_seq\', (SELECT MAX(boatId) from "boats"));')
  await knex.raw("ALTER SEQUENCE \"boats_boatId_seq\" RESTART WITH 20;")
};

// In the format below, please give me a list of 20 objects in json format for a KNEX seed file. These will represent boat listings for a website. 

// boatId must increment by 1
// sold must be false
// type can be boat or jet ski
// make can be any watercraft manufacturer
// model can be any model craft from that manufacturer
// year can be any year watercraft were made
// price can be anywhere from 1000-100000
// hours can be anything realistic for the year
// condition can be excellent, good, or poor
// location can be any air force base
// description can be a description of the condition of the watercraft

// {
//     boatId: 1,
//     sold: false,
//     type: "Seadoo",
//     make: "Toyota",
//     model: "Camry",
//     year: 2008,
//     price: 3000,
//     hours: 128,
//     condition: "good",
//     location: "Beale AFB",
//     description: "bent propeller. runs well. needs new canopy"
//   }
