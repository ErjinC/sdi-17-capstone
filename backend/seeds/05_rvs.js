/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('rvs').del()
  await knex('rvs').insert([
    {
      rvId: 1,
      sold: false,
      type: "motorized",
      make: "Jayco",
      model: "Alante",
      mileage: 26432,
      sleeps: 6,
      weight: 18000,
      year: 2024,
      price: 172418,
      length: 29,
      condition: "excellent",
      image: "https://i.imgur.com/2Po3XRf.jpg",
      location: "Beale AFB",
      description: "Like new vehicle, newly refurbished interior and flooring. Equipped with solar panels, Wi-Fi antennas, and two A/C units. Slight scratching present on the exterior, but otherwise in great condition."
    },
    {
      rvId: 2,
      sold: false,
      type: "motorized",
      make: "Winnebago",
      model: "Adventurer",
      mileage: 38219,
      sleeps: 4,
      weight: 16000,
      year: 2023,
      price: 148900,
      length: 32,
      condition: "good",
      image: "https://placekitten.com/500/300",
      location: "Edwards AFB",
      description: "Well-maintained motorhome with spacious interior. Slide-outs provide extra living space. Kitchen and bathroom in good condition. Perfect for family trips and camping adventures."
    },
    {
      rvId: 3,
      sold: false,
      type: "motorized",
      make: "Fleetwood",
      model: "Discovery",
      mileage: 20560,
      sleeps: 8,
      weight: 22000,
      year: 2022,
      price: 189000,
      length: 34,
      condition: "excellent",
      image: "https://placekitten.com/500/300",
      location: "Hill AFB",
      description: "Luxury motorhome with modern amenities. Spacious bedroom, well-appointed kitchen, and comfortable living area. Low mileage and in excellent condition. Ideal for large families or group travel."
    },
    {
      rvId: 4,
      sold: false,
      type: "motorized",
      make: "Thor Motor Coach",
      model: "Chateau",
      mileage: 31275,
      sleeps: 6,
      weight: 17000,
      year: 2021,
      price: 89000,
      length: 25,
      condition: "good",
      image: "https://placekitten.com/500/300",
      location: "Langley AFB",
      description: "Reliable and easy to drive motorhome. Well-maintained with a spacious interior. Sleeps up to six people comfortably. Perfect for weekend getaways and road trips."
    },
    {
      rvId: 5,
      sold: false,
      type: "motorized",
      make: "Forest River",
      model: "Georgetown",
      mileage: 18700,
      sleeps: 6,
      weight: 21000,
      year: 2023,
      price: 210000,
      length: 36,
      condition: "excellent",
      image: "https://placekitten.com/500/300",
      location: "Luke AFB",
      description: "Spacious and luxurious motorhome with multiple slide-outs. Modern amenities and entertainment options. Great for full-time living or extended vacations. Immaculate condition with low mileage."
    },
    {
      rvId: 6,
      sold: false,
      type: "motorized",
      make: "Airstream",
      model: "Interstate",
      mileage: 45201,
      sleeps: 4,
      weight: 10000,
      year: 2022,
      price: 195000,
      length: 24,
      condition: "good",
      image: "https://placekitten.com/500/300",
      location: "Nellis AFB",
      description: "Sleek and modern Class B motorhome. Well-maintained with a contemporary interior. Equipped with all necessary amenities for comfortable travel. Great for couples or small families."
    },
    {
      rvId: 7,
      sold: false,
      type: "motorized",
      make: "Newmar",
      model: "Dutch Star",
      mileage: 56788,
      sleeps: 4,
      weight: 28000,
      year: 2023,
      price: 235000,
      length: 40,
      condition: "good",
      image: "https://placekitten.com/500/300",
      location: "Scott AFB",
      description: "Spacious and elegant Class A motorhome. Luxurious interior with high-quality finishes. Ideal for long trips or full-time living. Well-maintained and in good condition."
    },
    {
      rvId: 8,
      sold: false,
      type: "motorized",
      make: "Tiffin",
      model: "Allegro Bus",
      mileage: 32900,
      sleeps: 6,
      weight: 32000,
      year: 2024,
      price: 250000,
      length: 42,
      condition: "excellent",
      image: "https://placekitten.com/500/300",
      location: "Travis AFB",
      description: "Luxury Class A motorhome with top-of-the-line features. Spacious and well-appointed interior. Perfect for high-end travelers seeking comfort and convenience."
    },
    {
      rvId: 9,
      sold: false,
      type: "motorized",
      make: "Entegra Coach",
      model: "Anthem",
      mileage: 41950,
      sleeps: 4,
      weight: 26000,
      year: 2023,
      price: 230000,
      length: 40,
      condition: "good",
      image: "https://placekitten.com/500/300",
      location: "Whiteman AFB",
      description: "Elegant and high-performance Class A motorhome. Well-maintained and in good condition. Perfect for travelers seeking luxury and comfort."
    },
    {
      rvId: 10,
      sold: false,
      type: "motorized",
      make: "Coachmen",
      model: "Mirada",
      mileage: 31000,
      sleeps: 8,
      weight: 18000,
      year: 2022,
      price: 120000,
      length: 31,
      condition: "good",
      image: "https://placekitten.com/500/300",
      location: "Vandenberg AFB",
      description: "Spacious and family-friendly Class A motorhome. Well-maintained and equipped with modern amenities. Ideal for family vacations and road trips."
    },
    {
      rvId: 11,
      sold: false,
      type: "towable",
      make: "Airstream",
      model: "Basecamp",
      mileage: 0,
      sleeps: 2,
      weight: 3500,
      year: 2023,
      price: 45000,
      length: 16,
      condition: "excellent",
      image: "https://placekitten.com/500/300",
      location: "Beale AFB",
      description: "Compact and lightweight travel trailer. Modern design with all necessary amenities. Perfect for adventurous couples seeking a cozy getaway."
    },
    {
      rvId: 12,
      sold: false,
      type: "towable",
      make: "Forest River",
      model: "Rockwood",
      mileage: 0,
      sleeps: 6,
      weight: 6000,
      year: 2022,
      price: 28000,
      length: 24,
      condition: "good",
      image: "https://placekitten.com/500/300",
      location: "Edwards AFB",
      description: "Family-friendly travel trailer. Well-maintained with a comfortable interior. Equipped with a kitchen, bathroom, and sleeping areas. Great for camping and outdoor adventures."
    },
    {
      rvId: 13,
      sold: false,
      type: "towable",
      make: "Keystone",
      model: "Cougar",
      mileage: 0,
      sleeps: 8,
      weight: 8500,
      year: 2023,
      price: 35000,
      length: 29,
      condition: "excellent",
      image: "https://placekitten.com/500/300",
      location: "Hill AFB",
      description: "Spacious and modern fifth wheel. Well-maintained and in excellent condition. Perfect for large families or groups. Features a comfortable living area and multiple sleeping spaces."
    },
    {
      rvId: 14,
      sold: false,
      type: "towable",
      make: "Jayco",
      model: "Eagle",
      mileage: 0,
      sleeps: 4,
      weight: 7000,
      year: 2021,
      price: 22000,
      length: 26,
      condition: "good",
      image: "https://placekitten.com/500/300",
      location: "Langley AFB",
      description: "Comfortable and versatile travel trailer. Well-suited for couples or small families. Features a fully-equipped kitchen, cozy sleeping area, and a bathroom."
    },
    {
      rvId: 15,
      sold: false,
      type: "towable",
      make: "Heartland",
      model: "Bighorn",
      mileage: 0,
      sleeps: 6,
      weight: 11000,
      year: 2022,
      price: 42000,
      length: 32,
      condition: "good",
      image: "https://placekitten.com/500/300",
      location: "Luke AFB",
      description: "Spacious and well-appointed fifth wheel. Features a luxurious interior with multiple slide-outs. Great for extended vacations or full-time living on the road."
    },
    {
      rvId: 16,
      sold: false,
      type: "towable",
      make: "Grand Design",
      model: "Reflection",
      mileage: 0,
      sleeps: 4,
      weight: 9500,
      year: 2023,
      price: 38000,
      length: 30,
      condition: "excellent",
      image: "https://placekitten.com/500/300",
      location: "Nellis AFB",
      description: "Elegant and well-maintained fifth wheel. Features a spacious living area with a fireplace and entertainment center. Ideal for couples seeking comfort and style."
    },
    {
      rvId: 17,
      sold: false,
      type: "towable",
      make: "Forest River",
      model: "Wildwood",
      mileage: 0,
      sleeps: 8,
      weight: 7500,
      year: 2022,
      price: 30000,
      length: 28,
      condition: "good",
      image: "https://placekitten.com/500/300",
      location: "Scott AFB",
      description: "Family-friendly travel trailer with a bunkhouse floorplan. Well-maintained and in good condition. Perfect for family vacations and camping trips."
    },
    {
      rvId: 18,
      sold: false,
      type: "towable",
      make: "Jayco",
      model: "White Hawk",
      mileage: 0,
      sleeps: 6,
      weight: 6500,
      year: 2023,
      price: 28000,
      length: 25,
      condition: "excellent",
      image: "https://placekitten.com/500/300",
      location: "Travis AFB",
      description: "Comfortable and versatile travel trailer. Well-suited for families and couples. Features a fully-equipped kitchen, spacious living area, and a bathroom."
    },
    {
      rvId: 19,
      sold: false,
      type: "towable",
      make: "Keystone",
      model: "Passport",
      mileage: 0,
      sleeps: 4,
      weight: 5500,
      year: 2024,
      price: 24000,
      length: 22,
      condition: "good",
      image: "https://placekitten.com/500/300",
      location: "Whiteman AFB",
      description: "Lightweight and compact travel trailer. Perfect for couples or small families. Features a comfortable sleeping area, kitchen, and bathroom."
    },
    {
      rvId: 20,
      sold: false,
      type: "towable",
      make: "Jayco",
      model: "Hummingbird",
      mileage: 0,
      sleeps: 2,
      weight: 3200,
      year: 2022,
      price: 18000,
      length: 18,
      condition: "good",
      image: "https://placekitten.com/500/300",
      location: "Vandenberg AFB",
      description: "Compact and lightweight travel trailer. Perfect for solo travelers or couples. Features a cozy interior with all essential amenities for comfortable trips."
    }
  ]);
  // await knex.raw('SELECT setval(\'rvs_rvId_seq\', (SELECT MAX(rvId) from "rvs"));')
  await knex.raw("ALTER SEQUENCE \"rvs_rvId_seq\" RESTART WITH 21;")
};