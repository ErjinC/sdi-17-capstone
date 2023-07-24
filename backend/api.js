const express = require('express')
const cors = require('cors')
const bcrypt = require('bcryptjs')
const { pwHash } = require('./helpers.js')
const knex = require('knex')(require('./knexfile.js')['development']);
const port = 3001

const api = express()

api.use(cors())
api.use(express.json())

api.get('/', (req,res) => {
    knex('users').select()
        .then(result => {
            res.status(200).json(result)
        })
})

api.post('/login', async (req,res) => {
    console.log(req.body)
    let query = await knex('users').select('password').where({username: req.body.username})
    let pw = query[0].password
    bcrypt.compare(req.body.password, pw, function(err, result) {
        if (result) {
            // authenticate
            res.status(200).json(pw)
        } else {
            // error
            res.status(400).json('Invalid pw')
        }
    })
})


api.listen(port, () => console.log('Backend running on port ', port))