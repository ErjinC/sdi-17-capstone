const express = require('express')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const { pwHash } = require('./helpers.js')
const knex = require('knex')(require('./knexfile.js')['development']);
const port = 3001

const api = express()

api.use(cors())
api.use(express.json())


//////////        GET REQUESTS        ///////////

api.get('/', (req, res) => {
    knex('users').select().orderBy('userId', 'asc')
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => res.send(err))
})

api.get('/users/:userid', (req, res) => {
    knex('users').select('userId', 'username', 'first_name', 'last_name', 'base', 'favorites', 'admin', 'phone', 'email').where({ userId: req.params.userid })
        .then(result => {
            res.status(200).json({ ...result[0], success: true })
        })
        .catch(err => res.send(err))
})

api.get('/listings', async (req, res) => {
    let carListings = await knex('listings').select(
        "listingId",
        "user_id",
        "car_id",
        "sold",
        "type",
        "make",
        "model",
        "year",
        "price",
        "mileage",
        "color",
        "transmission",
        "image",
        "condition",
        "location",
        "description",
        "created_at",
        "updated_at",
        "reported")
        .join('cars', { 'cars.carId': 'listings.car_id' })
    let rvListings = await knex('listings').select(
        "listingId",
        "user_id",
        "rv_id",
        "sold",
        "image",
        "type",
        "make",
        "model",
        "year",
        "price",
        "mileage",
        "condition",
        "location",
        "sleeps",
        "weight",
        "length",
        "description",
        "created_at",
        "updated_at",
        "reported")
        .join('rvs', { 'rvs.rvId': 'listings.rv_id' })
    let motoListings = await knex('listings').select(
        "listingId",
        "user_id",
        "motorcycle_id",
        "sold",
        "image",
        "type",
        "make",
        "model",
        "year",
        "price",
        "mileage",
        "color",
        "condition",
        "location",
        "description",
        "created_at",
        "created_at",
        "updated_at",
        "reported")
        .join('motorcycles', { 'motorcycles.motorcycleId': 'listings.motorcycle_id' })
    let boatListings = await knex('listings').select(
        'listingId',
        'boat_id',
        'user_id',
        'sold',
        'type',
        'description',
        'image',
        'make',
        'model',
        'year',
        'price',
        'hours',
        'condition',
        'location',
        "created_at",
        "updated_at",
        "reported")
        .join('boats', 'boats.boatId', 'listings.boat_id')
    let trailerListings = await knex('listings').select(
        'listingId',
        'trailer_id',
        'user_id',
        'sold',
        'type',
        'description',
        'image',
        'make',
        'model',
        'year',
        'price',
        'length',
        'condition',
        'location',
        "created_at",
        "updated_at",
        "reported")
        .join('trailers', 'trailers.trailerId', 'listings.trailer_id')

    let totalListings = { carListings, rvListings, motoListings, boatListings, trailerListings };
    res.status(200).json(totalListings)
})

api.get('/listings/:userid', async (req, res) => {
    let carListings = await knex('listings').select(
        "listingId",
        "user_id",
        "car_id",
        "sold",
        "type",
        "make",
        "model",
        "year",
        "price",
        "mileage",
        "color",
        "transmission",
        "image",
        "condition",
        "location",
        "description",
        "created_at",
        "updated_at",
        "reported")
        .join('cars', { 'cars.carId': 'listings.car_id' })
        .where({ user_id: parseInt(req.params.userid) })
    let rvListings = await knex('listings').select(
        "listingId",
        "user_id",
        "rv_id",
        "sold",
        "image",
        "type",
        "make",
        "model",
        "year",
        "price",
        "mileage",
        "condition",
        "location",
        "sleeps",
        "weight",
        "length",
        "description",
        "created_at",
        "updated_at",
        "reported")
        .join('rvs', { 'rvs.rvId': 'listings.rv_id' })
        .where({ user_id: parseInt(req.params.userid) })
    let motoListings = await knex('listings').select(
        "listingId",
        "user_id",
        "motorcycle_id",
        "sold",
        "image",
        "type",
        "make",
        "model",
        "year",
        "price",
        "mileage",
        "color",
        "condition",
        "location",
        "description",
        "created_at",
        "created_at",
        "updated_at",
        "reported")
        .join('motorcycles', { 'motorcycles.motorcycleId': 'listings.motorcycle_id' })
        .where({ user_id: parseInt(req.params.userid) })
    let boatListings = await knex('listings').select(
        'listingId',
        'user_id',
        'boat_id',
        'sold',
        'type',
        'description',
        'image',
        'make',
        'model',
        'year',
        'price',
        'hours',
        'condition',
        'location',
        "created_at",
        "updated_at",
        "reported")
        .join('boats', 'boats.boatId', 'listings.boat_id')
        .where({ user_id: parseInt(req.params.userid) })
    let trailerListings = await knex('listings').select(
        'listingId',
        'user_id',
        'trailer_id',
        'sold',
        'type',
        'description',
        'image',
        'make',
        'model',
        'year',
        'price',
        'length',
        'condition',
        'location',
        "created_at",
        "updated_at",
        "reported")
        .join('trailers', 'trailers.trailerId', 'listings.trailer_id')
        .where({ user_id: parseInt(req.params.userid) })

    let totalListings = { carListings, rvListings, motoListings, boatListings, trailerListings };
    res.status(200).json(totalListings)
})


api.get('/bases', (req, res) => {
    knex('bases').select().orderBy('name', 'asc')
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => console.log(err))
})

//////////        POST REQUESTS        //////////

// req.body = [{ object}] req.body[0].something

api.post('/login', async (req, res) => {     //     Allows a user to login
    if (req.body[0]) {
        let query = await knex('users').select('password').where({ username: req.body[0].username })
        if (query[0]) {
            let pw = query[0].password
            bcrypt.compare(req.body[0].password, pw, async function (err, result) {
                if (result) {
                    // authenticate
                    let user = await knex('users').select('userId', 'username', 'first_name', 'last_name', 'base', 'favorites', 'admin', 'phone', 'email').where({ username: req.body[0].username })
                    res.status(200).json({ ...user[0], success: true })
                } else {
                    // error
                    res.status(400).json({ success: false })
                }
            })
        } else {
            res.status(400).json('Request body is empty, try again.')
        }
    } else {
        res.status(400).json({ success: false })
    }
})

api.post('/register', async (req, res) => {     //     User Registration
    //first_name, last_name, username, password, base
    let userExists = await knex('users').first().where({ username: req.body[0].username })
    if (userExists != undefined) {
        res.status(400).json({ success: false, message: 'An account with that username already exists, please try again!' })
    } else {
        console.log('inserting user: ', req.body[0])
        knex('users').insert(
            {
                admin: false,
                username: req.body[0].username,
                password: pwHash(req.body[0].password),
                first_name: req.body[0].first_name,
                last_name: req.body[0].last_name,
                base: req.body[0].base,
                favorites: '',
                phone: req.body[0].phone,
                email: req.body[0].email
            }
        )
            .then(result => res.status(200).json({ success: true, message: 'Registration Successful!' }))
            .catch(err => res.status(404).json({ success: false, message: 'Server Error!' }));
    }
})

api.post('/addListing/rvs', async (req, res) => {     //     Adds a new rv based on listing information
    const newListing = req.body;

    const insertRV = await knex('rvs').insert({
        sold: false,
        image: newListing.image,
        type: newListing.type,
        make: newListing.make,
        model: newListing.model,
        year: newListing.year,
        price: newListing.price,
        mileage: newListing.mileage,
        condition: newListing.condition,
        location: newListing.location,
        sleeps: newListing.sleeps,
        weight: newListing.weight,
        length: newListing.length,
        description: newListing.description,
    });

    let getNewRvId = await knex.select('rvId').from('rvs').orderBy('created_at', 'desc').limit(1)

    const insertListing = await knex('listings').insert({
        user_id: newListing.userId,
        car_id: null,
        boat_id: null,
        rv_id: getNewRvId[0].rvId,
        motorcycle_id: null,
        trailer_id: null,
    })

    res.status(200).send({ success: true })
})

api.post('/addListing/boats', async (req, res) => {     //     Adds a new boat based on listing information
    const newListing = req.body;

    const insertBoat = await knex('boats').insert({
        sold: false,
        image: newListing.image,
        type: newListing.type,
        make: newListing.make,
        model: newListing.model,
        year: newListing.year,
        price: newListing.price,
        hours: newListing.hours,
        condition: newListing.condition,
        location: newListing.location,
        description: newListing.description,
    });

    let getNewBoatId = await knex.select('boatId').from('boats').orderBy('created_at', 'desc').limit(1)

    const insertListing = await knex('listings').insert({
        user_id: newListing.userId,
        car_id: null,
        boat_id: getNewBoatId[0].boatId,
        rv_id: null,
        motorcycle_id: null,
        trailer_id: null,
    })

    res.status(200).send({ success: true })
})

api.post('/addListing/trailers', async (req, res) => {     //     Adds a new trailers based on listing information
    const newListing = req.body;

    const insertTrailer = await knex('trailers').insert({
        sold: false,
        image: newListing.image,
        type: newListing.type,
        make: newListing.make,
        model: newListing.model,
        year: newListing.year,
        price: newListing.price,
        length: newListing.length,
        condition: newListing.condition,
        location: newListing.location,
        description: newListing.description,
    });

    let getNewTrailerId = await knex.select('trailerId').from('trailers').orderBy('created_at', 'desc').limit(1)

    const insertListing = await knex('listings').insert({
        user_id: newListing.userId,
        car_id: null,
        boat_id: null,
        rv_id: null,
        motorcycle_id: null,
        trailer_id: getNewTrailerId[0].trailerId,
    })

    res.status(200).send({ success: true })
})

api.post('/addListing/cars', async (req, res) => {     //     Adds a new car based on listing information
    const newListing = req.body;

    const insertCar = await knex('cars').insert({
        sold: false,
        image: newListing.image,
        type: newListing.type,
        make: newListing.make,
        model: newListing.model,
        year: newListing.year,
        price: newListing.price,
        mileage: newListing.mileage,
        color: newListing.color,
        transmission: newListing.transmission,
        condition: newListing.condition,
        location: newListing.location,
        description: newListing.description,
    });

    let getNewCarId = await knex.select('carId').from('cars').orderBy('created_at', 'desc').limit(1)

    const insertListing = await knex('listings').insert({
        user_id: newListing.userId,
        car_id: getNewCarId[0].carId,
        boat_id: null,
        rv_id: null,
        motorcycle_id: null,
        trailer_id: null,
    })

    res.status(200).send({ success: true })
})

api.post('/addListing/motorcycles', async (req, res) => {     //     Adds a new motorcycle based on listing information
    const newListing = req.body;

    const insertMotorcycle = await knex('motorcycles').insert({
        sold: false,
        image: newListing.image,
        type: newListing.type,
        make: newListing.make,
        model: newListing.model,
        year: newListing.year,
        price: newListing.price,
        mileage: newListing.mileage,
        color: newListing.color,
        condition: newListing.condition,
        location: newListing.location,
        description: newListing.description,
    });

    let getNewMotorcycleId = await knex.select('motorcycleId').from('motorcycles').orderBy('created_at', 'desc').limit(1)

    const insertListing = await knex('listings').insert({
        user_id: newListing.userId,
        car_id: null,
        boat_id: null,
        rv_id: null,
        motorcycle_id: getNewMotorcycleId[0].motorcycleId,
        trailer_id: null,
    })

    res.status(200).send({ success: true })
})

api.post('/bases', async (req, res) => {
    console.log(req.body)
    let result = await knex('bases').insert({name:req.body.name})
    res.status(200).json(result)
})

//////////        PUT REQUESTS        //////////

api.put('/updateUserPassword/:userId', async (req, res) => {     //     Allows a user to update their password
    const editUserId = req.params.userId
    const newPassword = req.body.newPassword;

    let hashedDBPasswordExists = await knex('users').select('password').where({ userId: editUserId })

    if (hashedDBPasswordExists) {
        let updatePassword = await knex('users').where({ userId: editUserId })
            .update({ password: pwHash(newPassword) })

        res.status(201).send({ success: true })
    } else {
        res.send({ success: false })
    }
})

api.put('/updateUserInfo/:userId', async (req, res) => {     //     Allows a user to update their general information
    const editUserId = req.params.userId
    const newInfo = req.body;

    const query = await knex.select('admin', 'username', 'first_name', 'last_name', 'base', 'email', 'password').from('users')
        .where({ userId: editUserId })
        .update({
            username: newInfo["newUsername"],
            first_name: newInfo["newFirstName"],
            last_name: newInfo["newLastName"],
            base: newInfo["newBase"],
            phone: newInfo["newPhone"],
            email: newInfo['newEmail']
        })

    query ? res.status(200).send({ ...newInfo, success: true }) : res.status(400).send({ success: false });
})

//////////        PATCH REQUESTS        //////////
api.patch('/favorites', (req, res) => {
    knex('users').where({ userId: req.body.userid })
        .update({ favorites: req.body.favorites })
        .then(res.status(200).json("Success"))
        .catch(err => res.status(500).send(err))
})

api.patch('/admin/:userid', (req, res) => {
    knex('users').where({ userId: req.params.userid })
        .update({ admin: req.body.admin })
        .then(res.status(200).json("Success"))
        .catch(err => res.status(500).send(err))
})

api.patch('/sold/:vehicleid', (req, res) => {
    let tableName = `${req.body.type}s`
    let vehicleID = `${req.body.type}Id`
    knex(tableName).where(vehicleID, req.params.vehicleid)
        .update({ sold: req.body.sold })
        .then(res.status(200).json("Success"))
        .catch(err => console.log(err))
})


api.patch('/report/:listingid', (req, res) => {
    knex('listings').where({ listingId: req.params.listingid })
        .update({ reported: req.body.reported })
        .then(res.status(200).json("Success"))
        .catch(err => console.log(err))
})

api.patch('/updateListing', (req, res) => {     //     Updates a boat/car/motorcycle/rv/trailer based on id given
    // console.log(req.body);
    // console.log(req.body.vehicleId);
    if (req.body.car_id) {
        knex('cars').where({ carId: req.body.car_id }).update({
            year: req.body.newYear,
            make: req.body.newMake,
            model: req.body.newModel,
            price: req.body.newPrice,
            description: req.body.newDescription,
            mileage: req.body.newMileage,
            transmission: req.body.newTransmission,
            color: req.body.newColor,
            condition: req.body.newCondition,
            location: req.body.newLocation,
            image: req.body.newUrl
            })
            .then(result => {
                if (result) {
                    knex('listings').select(
                        "listingId",
                        "user_id",
                        "car_id",
                        "sold",
                        "type",
                        "make",
                        "model",
                        "year",
                        "price",
                        "mileage",
                        "color",
                        "transmission",
                        "image",
                        "condition",
                        "location",
                        "description",
                        "created_at",
                        "updated_at")
                        .join('cars', { 'cars.carId': 'listings.car_id' })
                        .where({ car_id: req.body.car_id })
                        .then(car => {
                            res.status(200).json({ success: true, vehicle: car[0] })
                        })
                }
            })
    } else if (req.body.boat_id) {
        knex('boats').where({boatId: req.body.boat_id}).update({
        year: req.body.newYear,
        make: req.body.newMake,
        model: req.body.newModel,
        price: req.body.newPrice,
        description: req.body.newDescription,
        condition: req.body.newCondition,
        location: req.body.newLocation,
        image: req.body.newUrl
        })
        .then(result => {
            if (result) {
                knex('listings').select(
                    'listingId',
                    'boat_id',
                    'user_id',
                    'sold',
                    'type',
                    'description',
                    'image',
                    'make',
                    'model',
                    'year',
                    'price',
                    'hours',
                    'condition',
                    'location',
                    "created_at",
                    "updated_at")
                    .join('boats', 'boats.boatId','listings.boat_id')
                    .where({boat_id: req.body.boat_id})
                    .then(boat => {
                        console.log('boat: ', boat)
                        res.status(200).json({success: true, vehicle: boat[0]})
                    })
            }
        })
            .then(result => {
                if (result) {
                    knex('listings').select(
                        'listingId',
                        'boat_id',
                        'user_id',
                        'sold',
                        'type',
                        'description',
                        'image',
                        'make',
                        'model',
                        'year',
                        'price',
                        'hours',
                        'condition',
                        'location',
                        "created_at",
                        "updated_at")
                        .join('boats', 'boats.boatId', 'listings.boat_id')
                        .where({ boat_id: req.body.boat_id })
                        .then(boat => {
                            res.status(200).json({ success: true, vehicle: boat[0] })
                        })
                }
            })
    } else if (req.body.motorcycle_id) {
        knex('motorcycles').where({ motorcycleId: req.body.motorcycle_id }).update({
            year: req.body.newYear,
            make: req.body.newMake,
            model: req.body.newModel,
            price: req.body.newPrice,
            description: req.body.newDescription,
            mileage: req.body.newMileage,
            condition: req.body.newCondition,
            location: req.body.newLocation,
            image: req.body.newUrl
            })
            .then(result => {
                if (result) {
                    knex('listings').select(
                        "listingId",
                        "user_id",
                        "motorcycle_id",
                        "sold",
                        "image",
                        "type",
                        "make",
                        "model",
                        "year",
                        "price",
                        "mileage",
                        "color",
                        "condition",
                        "location",
                        "description",
                        "created_at",
                        "created_at",
                        "updated_at")
                        .join('motorcycles', { 'motorcycles.motorcycleId': 'listings.motorcycle_id' })
                        .where({ motorcycle_id: req.body.motorcycle_id })
                        .then(motorcycle => {
                            res.status(200).json({ success: true, vehicle: motorcycle[0] })
                        })
                }
            })
    } else if (req.body.rv_id) {
        knex('rvs').where({ rvId: req.body.rv_id }).update({
            year: req.body.newYear,
            make: req.body.newMake,
            model: req.body.newModel,
            price: req.body.newPrice,
            description: req.body.newDescription,
            mileage: req.body.newMileage,
            condition: req.body.newCondition,
            location: req.body.newLocation,
            weight: req.body.newWeight,
            length: req.body.newLength,
            image: req.body.newUrl,
            })
            .then(result => {
                if (result) {
                    knex('listings').select(
                        "listingId",
                        "user_id",
                        "rv_id",
                        "sold",
                        "image",
                        "type",
                        "make",
                        "model",
                        "year",
                        "price",
                        "mileage",
                        "condition",
                        "location",
                        "sleeps",
                        "weight",
                        "length",
                        "description",
                        "created_at",
                        "updated_at")
                        .join('rvs', { 'rvs.rvId': 'listings.rv_id' })
                        .where({ rv_id: req.body.rv_id })
                        .then(rv => {
                            res.status(200).json({ success: true, vehicle: rv[0] })
                        })
                }
            })
    } else if (req.body.trailer_id) {
        knex('trailers').where({ trailerId: req.body.trailer_id }).update({
            year: req.body.newYear,
            make: req.body.newMake,
            model: req.body.newModel,
            length: req.body.newLength,
            price: req.body.newPrice,
            description: req.body.newDescription,
            condition: req.body.newCondition,
            location: req.body.newLocation,
            image: req.body.newUrl
            })
            .then(result => {
                if (result) {
                    knex('listings').select(
                        'listingId',
                        'trailer_id',
                        'user_id',
                        'sold',
                        'type',
                        'description',
                        'image',
                        'make',
                        'model',
                        'year',
                        'price',
                        'length',
                        'condition',
                        'location',
                        "created_at",
                        "updated_at")
                        .join('trailers', 'trailers.trailerId', 'listings.trailer_id')
                        .where({ trailer_id: req.body.trailer_id })
                        .then(trailer => {
                            res.status(200).json({ success: true, vehicle: trailer[0] })
                        })
                }
            })
    } else {
        res.status(400).json({ success: false })
    }

    // res.status(200).json({body_response: req.body})
})

//////////        DEL REQUESTS        //////////

// api.delete('/listings/:listingId', (req, res) => {

// })

api.delete('/deleteUser/:userId', async (req, res) => {     //     Deletes a User's account
    const userId = req.params.userId

    await knex('users').where({ userId: userId }).delete()
        .then(res.status(200).send({ success: true }))
        .catch(err => console.log(err))
})

api.delete('/listings', async (req, res) => {     //    Deletes a vehicle based on vehicle passed in
    if (req.body.car_id) {
        knex('cars').where({ carId: req.body.car_id }).del()
            .then(result => res.status(202).send({ success: true }))
    } else if (req.body.boat_id) {
        knex('boats').where({ boatId: req.body.boat_id }).del()
            .then(result => res.status(202).send({ success: true }))
    } else if (req.body.motorcycle_id) {
        knex('motorcycles').where({ motorcycleId: req.body.motorcycle_id }).del()
            .then(result => res.status(202).send({ success: true }))
    } else if (req.body.rv_id) {
        knex('rvs').where({ rvId: req.body.rv_id }).del()
            .then(result => res.status(202).send({ success: true }))
    } else if (req.body.trailer_id) {
        knex('trailers').where({ trailerId: req.body.trailer_id }).del()
            .then(result => res.status(202).send({ success: true }))
    } else {
        res.status(400).json({ success: false })
    }
})

api.delete('/bases/:baseid', (req, res) => {
    knex('bases').where({baseId:req.params.baseid}).del()
    .then(res.status(200).json('Success'))
    .catch(err => console.log(err))
})


//////////        MISC REQUESTS        //////////

api.listen(port, () => console.log('Backend running on port ', port))