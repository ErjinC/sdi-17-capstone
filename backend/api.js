const express = require('express')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const { pwHash } = require('./helpers.js')
// const knex = require('knex')(require('./knexfile.js')['development']);
const port = 3001

const api = express()

api.use(cors())
api.use(express.json())

api.get('/', (req,res) => {
    res.status(200).json('Home');
})

api.post('/login', (request, response) => {
   const dummy = [{
        "userId": 1,
        "admin": true,
        "username": "1234",
        "password": "1234",
        "first_name": "Larry", // auth[0].first_name
        "last_name": "Llama",
        "base": "Beale AFB",
        "favorites": "1,2,3,4,5"
    }]
    if (request.body[0].username === dummy[0].username && request.body[0].password === dummy[0].password) {
        response.status(200).send(dummy)
    } else {
        response.status(200).send([])
    }
    // knex('users')
    // .select('*')
    // .where('username', 'like', request.body[0].username)
    // .where('password', 'like', request.body[0].password)
    // .then(data => response.status(200).send(data))
  })

api.listen(port, () => console.log('Backend running on port ', port))