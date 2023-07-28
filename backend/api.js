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

api.get('/', (req,res) => {
    knex('users').select().orderBy('userId', 'asc')
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err=>res.send(err))
})

api.get('/users/:userid', (req, res) => {
    knex('users').select('userId', 'username', 'first_name', 'last_name', 'base', 'favorites', 'admin','phone','email').where({userId: req.params.userid})
        .then(result => {
            res.status(200).json({...result[0], success:true})
        })
        .catch(err=>res.send(err))
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
        "updated_at")
        .join('cars', {'cars.carId': 'listings.car_id'})
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
        "updated_at")
        .join('rvs', {'rvs.rvId': 'listings.rv_id'})
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
        "updated_at")
        .join('motorcycles', {'motorcycles.motorcycleId': 'listings.motorcycle_id'})
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
            "updated_at")
            .join('boats', 'boats.boatId','listings.boat_id')
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
            "updated_at")
            .join('trailers', 'trailers.trailerId','listings.trailer_id')

    let totalListings = {carListings, rvListings, motoListings, boatListings, trailerListings};
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
        "updated_at")
        .join('cars', {'cars.carId': 'listings.car_id'})
        .where({user_id: parseInt(req.params.userid)})
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
        "updated_at")
        .join('rvs', {'rvs.rvId': 'listings.rv_id'})
        .where({user_id: parseInt(req.params.userid)})
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
        "updated_at")
        .join('motorcycles', {'motorcycles.motorcycleId': 'listings.motorcycle_id'})
        .where({user_id: parseInt(req.params.userid)})
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
        "updated_at")
        .join('boats', 'boats.boatId','listings.boat_id')
        .where({user_id: parseInt(req.params.userid)})
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
        "updated_at")
        .join('trailers', 'trailers.trailerId','listings.trailer_id')
        .where({user_id: parseInt(req.params.userid)})

    let totalListings = {carListings, rvListings, motoListings, boatListings, trailerListings};
    res.status(200).json(totalListings)
})

api.get('/allUniqueLocations', async (req, res) => {     //     Gets all unique locations in the DB & sends them back
    let carLocations = await knex('cars').select("location");
    let rvLocations = await knex('rvs').select("location")   ; 
    let motoLocations = await knex('motorcycles').select("location");
    let boatLocations = await knex('boats').select("location");
    let trailerLocations = await knex('trailers').select("location");
            
    let totalLocations = [carLocations, rvLocations, motoLocations, boatLocations, trailerLocations];
    let uniqueLocations = [];
    
    totalLocations.forEach((vehicleType) => {
        vehicleType.forEach((vehicleLocation) => {
            if (!uniqueLocations.includes(vehicleLocation.location)) {
                uniqueLocations.push(vehicleLocation.location);
            }
        });
    })

    res.status(200).send({
        locations: uniqueLocations,
        success: true
    })
})


//////////        POST REQUESTS        //////////

// req.body = [{ object}] req.body[0].something

api.post('/login', async (req,res) => {     //     Allows a user to login
    // console.log('body: ', req.body[0].username)
    // console.log('request body: ', req.body[0])
    if(req.body[0]){
    let query = await knex('users').select('password').where({username: req.body[0].username})
    // console.log('query ', query)
    if(query[0]){
        let pw = query[0].password
        bcrypt.compare(req.body[0].password, pw, async function(err, result) {
            if (result) {
                // authenticate
                let user = await knex('users').select('userId', 'username', 'first_name', 'last_name', 'base', 'favorites', 'admin').where({username: req.body[0].username})
                // console.log('user: ', {...user[0], success: true})
                res.status(200).json({...user[0], success: true})
            } else {
                // error
                res.status(400).json({success: false})
            }
        })
        }else{
            res.status(400).json('Request body is empty, try again.')
        }
    }else{
        res.status(400).json({success: false})
    }
})

api.post('/register', async (req, res) => {     //     User Registration
    //first_name, last_name, username, password, base
    let userExists = await knex('users').first().where({username: req.body[0].username})
    // console.log('user exists? ', userExists)
    if (userExists != undefined) {
        res.status(400).json({success: false, message: 'An account with that username already exists, please try again!'})
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
                favorites: ''
            }
        )
        .then(result => res.status(200).json({success: true, message: 'Registration Successful!'}))
        .catch(err => res.status(404).json({success: false, message: 'Server Error!'}));
    }
})

api.post('/addListing/rvs', async (req, res) => {     //     Adds a new rv based on listing information
	const newListing = req.body;

	const insertRV = await knex('rvs').insert({
		sold: false,
		image: 'https://placekitten.com/500/300',
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
		image: 'https://placekitten.com/500/300',
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
		image: 'https://placekitten.com/500/300',
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
		image: 'https://placekitten.com/500/300',
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

	const insertMotorcycle= await knex('motorcycles').insert({
		sold: false,
		image: 'https://placekitten.com/500/300',
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

//////////        PUT REQUESTS        //////////

api.put('/updateUserPassword/:userId', async (req, res) => {     //     Allows a user to update their password
    const editUserId = req.params.userId
    const newPassword = req.body.newPassword;

    let hashedDBPasswordExists = await knex('users').select('password').where({userId: editUserId})

    if (hashedDBPasswordExists) {
        let updatePassword = await knex('users').where({userId: editUserId})
            .update({password: pwHash(newPassword)})
    
        res.status(201).send({success: true})
    } else {
        res.send({success: false})
    }
})

api.put('/updateUserInfo/:userId', async (req, res) => {     //     Allows a user to update their general information
    const editUserId = req.params.userId
    const newInfo = req.body;

    const query = await knex.select('admin', 'username', 'first_name', 'last_name', 'base').from('users')
        .where({userId: editUserId})
        .update({
            admin: newInfo["newAdminStatus"],
            username: newInfo["newUsername"],
            first_name: newInfo["newFirstName"],
            last_name: newInfo["newLastName"],
            base: newInfo["newBase"],
        })
        
    query ? res.status(200).send({...newInfo, success: true}) : res.status(400).send({success: false});
})

//////////        PATCH REQUESTS        //////////
api.patch('/favorites', (req, res) => {
    knex('users').where({userId: req.body.userid})
    .update({favorites: req.body.favorites})
    .then(res.status(200).json("Success"))
    .catch(err => res.status(500).send(err))
})

api.patch('/sold/:vehicleid', (req, res) => {
    let tableName = `${req.body.type}s`
    let vehicleID = `${req.body.type}Id`
    knex(tableName).where(vehicleID, req.params.vehicleid)
    .update({sold: req.body.sold})
    .then(res.status(200).json("Success"))
    .catch(err => console.log(err))
})

//////////        DEL REQUESTS        //////////

// api.delete('/listings/:listingId', (req, res) => {
    
// })

api.delete('/deleteUser/:userId', async (req, res) => {     //     Deletes a User's account
    const userId = req.params.userId 

    let deleteOperation = await knex('users').where({userId: userId}).delete()
    res.status(200).send({success: true})
})

api.delete('/listings', async (req, res) => {     //    Deletes a vehicle based on vehicle passed in
    console.log(req.body)
    if (req.body.car_id) {
        knex('cars').where({carId: req.body.car_id}).del()
            .then(result => res.status(202).send({success: true}))
    } else if (req.body.boat_id) {
        knex('boats').where({boatId: req.body.boat_id}).del()
            .then(result => res.status(202).send({success: true}))
    } else if (req.body.motorcycle_id) {
        knex('motorcycles').where({motorcycleId: req.body.motorcycle_id}).del()
            .then(result => res.status(202).send({success: true}))
    } else if (req.body.rv_id) {
        knex('rvs').where({rvId: req.body.rv_id}).del()
            .then(result => res.status(202).send({success: true}))
    } else if (req.body.trailer_id) {
        knex('trailers').where({trailerId: req.body.trailer_id}).del()
            .then(result => res.status(202).send({success: true}))
    } else {
        res.status(400).json({success: false})
    }
})


//////////        MISC REQUESTS        //////////

api.listen(port, () => console.log('Backend running on port ', port))