const express = require('express')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const { pwHash } = require('./helpers.js')
const knex = require('knex')(require('./knexfile.js')['development']);
const port = 3001

const api = express()

api.use(cors())
api.use(express.json())

//////////        GET REQUESTS        //////////

api.get('/', (req,res) => {
    knex('users').select().orderBy('userId', 'asc')
        .then(result => {
            res.status(200).json(result)
        })
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
    let boatListings = await knex('listings').select('listingId','user_id','sold','type','description','image','make','model','year','price','hours','condition','location',"created_at","updated_at").join('boats', 'boats.boatId','listings.boat_id')
    let trailerListings = await knex('listings').select('listingId','user_id','sold','type','description','image','make','model','year','price','length','condition','location',"created_at","updated_at").join('trailers', 'trailers.trailerId','listings.trailer_id')

    let totalListings = {carListings, rvListings, motoListings, boatListings, trailerListings};
    console.log(totalListings)
    res.status(200).json(totalListings)
})

//////////        POST REQUESTS        //////////

// req.body = [{ object}] req.body[0].something

api.post('/login', async (req,res) => {     //     Allows a user to login
    // console.log('body: ', req.body[0].username)
    let query = await knex('users').select('password').where({username: req.body[0].username})
    // console.log('query ', query)
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
})

api.post('/register', async (req, res) => {
    //first_name, last_name, username, password, base
    let userExists = await knex('users').first().where({username: req.body[0].username})
    // console.log('user exists? ', userExists)
    if (userExists != undefined) {
        res.status(400).json('User exists')
    } else {
        // console.log('inserting user: ', req.body[0])
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
        .then(result => res.status(200).json('Success'))
        .catch(err => res.status(404).json(err));
    }
})

//////////        PUT REQUESTS        //////////

api.put('/updateUserPassword/:userID', async (req, res) => {     //     Allows a user to update their password
    const editUserId = req.params.userID
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


//////////        DEL REQUESTS        //////////



//////////        MISC REQUESTS        //////////

api.listen(port, () => console.log('Backend running on port ', port))