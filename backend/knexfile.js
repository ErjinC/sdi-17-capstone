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
    // connection: 'postgres://postgres:docker@172.21.0.2:5432/capstonedb'
    // connection: 'postgres://postgres:docker@host.docker.internal/capstonedb'
    connection: 'postgres://postgres:docker@host.docker.internal:5432/capstonedb'
    // connection: 'postgres://postgres:docker@localhost:5432/capstonedb'
    // connection: 'postgres://postgres:docker@127.0.0.1:5432/capstonedb'
    // connection: process.env.DB_CONNECTION_STRING
  }

};

