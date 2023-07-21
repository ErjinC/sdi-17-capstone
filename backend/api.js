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

api.listen(port, () => console.log('Backend running on port ', port))