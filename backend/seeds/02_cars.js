/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('cars').del()
  await knex('cars').insert([
    {
      carId: 1,
      sold: false,
      type: "car",
      make: "Toyota",
      model: "Camry",
      year: 2008,
      price: 3000,
      mileage: 173495,
      color: "red",
      transmission: "automatic",
      condition: "good",
      location: "Beale AFB",
      description: "No AC. Runs well. Needs new tires"
  },
  {
      carId: 2,
      sold: false,
      type: "truck",
      make: "Ford",
      model: "F-150",
      year: 2014,
      price: 20000,
      mileage: 80000,
      color: "blue",
      transmission: "manual",
      condition: "excellent",
      location: "Davis-Monthan AFB",
      description: "Very clean truck. Well maintained."
  },
  {
      carId: 3,
      sold: false,
      type: "coupe",
      make: "Chevrolet",
      model: "Corvette",
      year: 2010,
      price: 25000,
      mileage: 55000,
      color: "yellow",
      transmission: "automatic",
      condition: "good",
      location: "Edwards AFB",
      description: "Minor scratches. Runs great."
  },
  {
      carId: 4,
      sold: false,
      type: "car",
      make: "Honda",
      model: "Accord",
      year: 2012,
      price: 8000,
      mileage: 100000,
      color: "black",
      transmission: "automatic",
      condition: "excellent",
      location: "Elmendorf AFB",
      description: "Very clean and well kept. Great mileage."
  },
  {
      carId: 5,
      sold: false,
      type: "truck",
      make: "Toyota",
      model: "Tacoma",
      year: 2016,
      price: 30000,
      mileage: 40000,
      color: "white",
      transmission: "automatic",
      condition: "good",
      location: "Eglin AFB",
      description: "Rugged truck with minor wear and tear. Runs smooth."
  },
  {
      carId: 6,
      sold: false,
      type: "coupe",
      make: "Ford",
      model: "Mustang",
      year: 2009,
      price: 9000,
      mileage: 87000,
      color: "red",
      transmission: "manual",
      condition: "good",
      location: "Barksdale AFB",
      description: "Well kept, some minor bodywork needed."
  },
  {
      carId: 7,
      sold: false,
      type: "car",
      make: "BMW",
      model: "3 Series",
      year: 2016,
      price: 20000,
      mileage: 50000,
      color: "blue",
      transmission: "automatic",
      condition: "excellent",
      location: "Andrews AFB",
      description: "Clean car with full service history."
  },
  {
      carId: 8,
      sold: false,
      type: "car",
      make: "Hyundai",
      model: "Elantra",
      year: 2018,
      price: 15000,
      mileage: 30000,
      color: "silver",
      transmission: "automatic",
      condition: "excellent",
      location: "Altus AFB",
      description: "Very clean, low mileage, runs like new."
  },
  {
      carId: 9,
      sold: false,
      type: "truck",
      make: "Dodge",
      model: "Ram",
      year: 2012,
      price: 18000,
      mileage: 95000,
      color: "black",
      transmission: "manual",
      condition: "good",
      location: "Buckley AFB",
      description: "Strong truck, good for work or travel."
  },
  {
      carId: 10,
      sold: false,
      type: "coupe",
      make: "Honda",
      model: "Civic",
      year: 2019,
      price: 21000,
      mileage: 20000,
      color: "red",
      transmission: "automatic",
      condition: "excellent",
      location: "Cannon AFB",
      description: "Low mileage, excellent condition, single owner."
  },
  {
      carId: 11,
      sold: false,
      type: "car",
      make: "Subaru",
      model: "Forester",
      year: 2017,
      price: 17000,
      mileage: 45000,
      color: "blue",
      transmission: "automatic",
      condition: "good",
      location: "Dyess AFB",
      description: "Minor wear and tear, runs great, good for outdoor adventures."
  },
  {
      carId: 12,
      sold: false,
      type: "truck",
      make: "Chevrolet",
      model: "Silverado",
      year: 2015,
      price: 22000,
      mileage: 60000,
      color: "white",
      transmission: "automatic",
      condition: "good",
      location: "Eielson AFB",
      description: "Solid truck with some minor scratches, runs well."
  },
  {
      carId: 13,
      sold: false,
      type: "coupe",
      make: "Dodge",
      model: "Challenger",
      year: 2020,
      price: 25000,
      mileage: 15000,
      color: "black",
      transmission: "manual",
      condition: "excellent",
      location: "Fairchild AFB",
      description: "Low mileage, excellent condition, like new."
  },
  {
      carId: 14,
      sold: false,
      type: "car",
      make: "Volkswagen",
      model: "Passat",
      year: 2015,
      price: 10000,
      mileage: 75000,
      color: "gray",
      transmission: "automatic",
      condition: "good",
      location: "Goodfellow AFB",
      description: "Some scratches, well maintained, runs great."
  },
  {
      carId: 15,
      sold: false,
      type: "truck",
      make: "GMC",
      model: "Sierra",
      year: 2016,
      price: 30000,
      mileage: 40000,
      color: "red",
      transmission: "automatic",
      condition: "excellent",
      location: "Hanscom AFB",
      description: "Low mileage, well kept, runs like new."
  },
  {
    carId: 16,
    sold: false,
    type: "coupe",
    make: "Chevrolet",
    model: "Camaro",
    year: 2018,
    price: 25000,
    mileage: 20000,
    color: "yellow",
    transmission: "automatic",
    condition: "excellent",
    location: "Hill AFB",
    description: "Well kept, low mileage, runs like new."
},
{
    carId: 17,
    sold: false,
    type: "car",
    make: "Audi",
    model: "A4",
    year: 2017,
    price: 28000,
    mileage: 30000,
    color: "white",
    transmission: "automatic",
    condition: "excellent",
    location: "Holloman AFB",
    description: "Clean car, low mileage, full service history."
},
{
    carId: 18,
    sold: false,
    type: "truck",
    make: "Toyota",
    model: "Tundra",
    year: 2016,
    price: 32000,
    mileage: 45000,
    color: "silver",
    transmission: "automatic",
    condition: "excellent",
    location: "Keesler AFB",
    description: "Excellent condition, low mileage, runs smooth."
},
{
    carId: 19,
    sold: false,
    type: "coupe",
    make: "BMW",
    model: "M4",
    year: 2020,
    price: 55000,
    mileage: 10000,
    color: "blue",
    transmission: "manual",
    condition: "excellent",
    location: "Kirtland AFB",
    description: "Like new, low mileage, well maintained."
},
{
    carId: 20,
    sold: false,
    type: "car",
    make: "Lexus",
    model: "ES",
    year: 2019,
    price: 35000,
    mileage: 15000,
    color: "black",
    transmission: "automatic",
    condition: "excellent",
    location: "Lackland AFB",
    description: "Excellent condition, low mileage, like new."
}
 
  ]);
//   await knex.raw('SELECT setval(\'cars_carId_seq\', (SELECT MAX(carId) from "cars"));')
    await knex.raw("ALTER SEQUENCE \"cars_carId_seq\" RESTART WITH 20;")
};





