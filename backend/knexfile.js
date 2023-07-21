/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

// module.exports = {

//     development: {
//       client: 'pg',
//       connection: {
//         host: '127.0.0.1',
//         password: 'docker',
//         user: 'postgres',
//         port: 5432,
//         database: 'capstonedb'
//       }
//     }
  
// };


module.exports = {
 
  development: {
    client: 'pg',
    connection: 'postgres://postgres:docker@host.docker.internal/capstonedb'
    // connection: process.env.DB_CONNECTION_STRING
  }

};

