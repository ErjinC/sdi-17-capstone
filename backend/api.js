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
        .then(response => {
            res.status(200).json(result)
        })
})

api.post('/login', async (req,res) => {
    console.log(req.body)
    let pw = await knex('users').select('password').where('username',req.body.username)
    console.log(pw)
    res.json(pw);
    // bcrypt.compare(req.body.password, pw, function(err, result) {
    //     if (result) {}
    //         // authenticate
    //     } else {
    //         // error
    //     }
    // })
})


api.listen(port, () => console.log('Backend running on port ', port))