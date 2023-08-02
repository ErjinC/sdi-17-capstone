/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('motorcycles').del()
  await knex('motorcycles').insert([
    {
      motorcycleId: 1,
      sold: false,
      image: "https://i.imgur.com/J9E68OR.jpg",
      type: "Street Bike",
      make: "Honda",
      model: "CBR1000",
      year: 2008,
      price: 7600,
      mileage: 3597,
      color: "green",
      condition: "good",
      location: "Beale AFB",
      description: "Garage kept. No issues."
    },
    {
      motorcycleId: 2,
      sold: false,
      image: "https://i.imgur.com/UcHAR9E.jpg",
      type: "Dirt Bike",
      make: "KTM",
      model: "450 SX-F",
      year: 2016,
      price: 5500,
      mileage: 1200,
      color: "orange",
      condition: "excellent",
      location: "Edwards AFB",
      description: "Excellent condition. Barely ridden."
    },
    {
      motorcycleId: 3,
      sold: false,
      image: "https://i.imgur.com/4moj4A7.jpg",
      type: "Cruiser",
      make: "Harley-Davidson",
      model: "Softail Deluxe",
      year: 2010,
      price: 13000,
      mileage: 8000,
      color: "black",
      condition: "good",
      location: "Andrews AFB",
      description: "Well maintained, some minor scratches."
    },
    {
      motorcycleId: 4,
      sold: false,
      image: "https://i.imgur.com/G5gt0gE.jpg",
      type: "Sport Bike",
      make: "Yamaha",
      model: "YZF-R1",
      year: 2020,
      price: 16500,
      mileage: 400,
      color: "blue",
      condition: "excellent",
      location: "Barksdale AFB",
      description: "Like new, minimal usage."
    },
    {
      motorcycleId: 5,
      sold: false,
      image: "https://i.imgur.com/xCposhG.jpg",
      type: "Touring Bike",
      make: "BMW",
      model: "R1250 RT",
      year: 2022,
      price: 18500,
      mileage: 100,
      color: "red",
      condition: "excellent",
      location: "Eglin AFB",
      description: "Brand new, showroom condition."
    },
    {
      motorcycleId: 6,
      sold: false,
      image: "https://placekitten.com/500/300",
      type: "Adventure Bike",
      make: "Triumph",
      model: "Tiger 800",
      year: 2018,
      price: 11500,
      mileage: 3500,
      color: "white",
      condition: "good",
      location: "Elmendorf AFB",
      description: "Good condition, minor wear from use."
    },
    {
      motorcycleId: 7,
      sold: false,
      image: "https://placekitten.com/500/300",
      type: "Dual Sport",
      make: "Suzuki",
      model: "DR650S",
      year: 2016,
      price: 6500,
      mileage: 7500,
      color: "grey",
      condition: "good",
      location: "Cannon AFB",
      description: "Good condition. Regular maintenance."
    },
    {
      motorcycleId: 8,
      sold: false,
      image: "https://placekitten.com/500/300",
      type: "Street Bike",
      make: "Ducati",
      model: "Panigale V2",
      year: 2021,
      price: 17000,
      mileage: 1500,
      color: "red",
      condition: "excellent",
      location: "Davis-Monthan AFB",
      description: "Excellent condition. Low mileage."
    },
    {
      motorcycleId: 9,
      sold: false,
      image: "https://placekitten.com/500/300",
      type: "Dirt Bike",
      make: "Kawasaki",
      model: "KX450",
      year: 2019,
      price: 7500,
      mileage: 2500,
      color: "green",
      condition: "good",
      location: "Buckley SFB",
      description: "Good condition. Regularly serviced."
    },
    {
      motorcycleId: 10,
      sold: false,
      image: "https://placekitten.com/500/300",
      type: "Cruiser",
      make: "Indian",
      model: "Chief Vintage",
      year: 2015,
      price: 15000,
      mileage: 11000,
      color: "black",
      condition: "good",
      location: "Dover AFB",
      description: "Good condition. Garage kept."
    },
    {
      motorcycleId: 11,
      sold: false,
      image: "https://placekitten.com/500/300",
      type: "Street Bike",
      make: "Honda",
      model: "CB500F",
      year: 2020,
      price: 6500,
      mileage: 2500,
      color: "black",
      condition: "excellent",
      location: "F.E. Warren AFB",
      description: "Excellent condition. Low mileage."
    },
    {
      motorcycleId: 12,
      sold: false,
      image: "https://placekitten.com/500/300",
      type: "Dirt Bike",
      make: "Husqvarna",
      model: "TC250",
      year: 2018,
      price: 8000,
      mileage: 2200,
      color: "blue",
      condition: "good",
      location: "Fairchild AFB",
      description: "Good condition. Regularly serviced."
    },
    {
      motorcycleId: 13,
      sold: false,
      image: "https://placekitten.com/500/300",
      type: "Cruiser",
      make: "Victory",
      model: "High-Ball",
      year: 2016,
      price: 13000,
      mileage: 9000,
      color: "black",
      condition: "good",
      location: "Goodfellow AFB",
      description: "Good condition. Regular maintenance."
    },
    {
      motorcycleId: 14,
      sold: false,
      image: "https://placekitten.com/500/300",
      type: "Sport Bike",
      make: "Aprilia",
      model: "RSV4",
      year: 2021,
      price: 17500,
      mileage: 1700,
      color: "black",
      condition: "excellent",
      location: "Grand Forks AFB",
      description: "Excellent condition. Low mileage."
    },
    {
      motorcycleId: 15,
      sold: false,
      image: "https://placekitten.com/500/300",
      type: "Touring Bike",
      make: "Harley-Davidson",
      model: "Road King",
      year: 2020,
      price: 20000,
      mileage: 3500,
      color: "red",
      condition: "excellent",
      location: "Hanscom AFB",
      description: "Excellent condition. Garage kept."
    },
    {
      motorcycleId: 16,
      sold: false,
      image: "https://placekitten.com/500/300",
      type: "Adventure Bike",
      make: "BMW",
      model: "F850 GS",
      year: 2019,
      price: 14000,
      mileage: 4000,
      color: "grey",
      condition: "good",
      location: "Hickam AFB",
      description: "Good condition. Regular maintenance."
    },
    {
      motorcycleId: 17,
      sold: false,
      image: "https://placekitten.com/500/300",
      type: "Dual Sport",
      make: "KTM",
      model: "690 Enduro R",
      year: 2020,
      price: 10500,
      mileage: 3200,
      color: "orange",
      condition: "good",
      location: "Hill AFB",
      description: "Good condition. Regularly serviced."
    },
    {
      motorcycleId: 18,
      sold: false,
      image: "https://placekitten.com/500/300",
      type: "Street Bike",
      make: "Suzuki",
      model: "GSX-R1000",
      year: 2022,
      price: 16000,
      mileage: 200,
      color: "blue",
      condition: "excellent",
      location: "Holloman AFB",
      description: "Brand new, showroom condition."
    },
    {
      motorcycleId: 19,
      sold: false,
      image: "https://placekitten.com/500/300",
      type: "Dirt Bike",
      make: "Honda",
      model: "CRF450R",
      year: 2020,
      price: 8500,
      mileage: 1500,
      color: "red",
      condition: "excellent",
      location: "Joint Base Andrews",
      description: "Excellent condition. Low mileage."
    },
    {
      motorcycleId: 20,
      sold: false,
      image: "https://placekitten.com/500/300",
      type: "Cruiser",
      make: "Yamaha",
      model: "V Star 1300",
      year: 2015,
      price: 9000,
      mileage: 10000,
      color: "grey",
      condition: "good",
      location: "Keesler AFB",
      description: "Good condition. Regular maintenance."
    }
  
    
  ]);
  // await knex.raw('SELECT setval(\'motorcycles_motorcycleId_seq\', (SELECT MAX(motorcycleId) from "motorcycles"));')
  await knex.raw("ALTER SEQUENCE \"motorcycles_motorcycleId_seq\" RESTART WITH 21;")
};

// In the format below, please give me a list of 20 objects in json format for a KNEX seed file. These will represent boat listings for a website. Show me all 20.

// motorcycleId must increment by 1
// sold must be false
// image must be a url to an image of the year + make + model of motorcycle
// type can be street bike, dirt bike, or any other type of bike
// make can be any motorcycle manufacturer
// model can be any model motorcycle from that manufacturer
// year can be any year motorcycles were made
// price can be anything realistic for a motorcycle
// mileage can be anything realistic for that year motorcycle
// color can be any color
// condition can be excellent, good, or poor
// location can be any air force base
// description can be a description of the condition of the watercraft

// {
//     motorcycleId: 1,
//     sold: false,
//     image: '',
//     type: "motorcycle",
//     make: "Honda",
//     model: "CBR1000",
//     year: 2008,
//     price: 7600,
//     mileage: 3597,
//     color: "green",
//     condition: "good",
//     location: "Beale AFB",
//     description: "garage kept. no issues."
//   }