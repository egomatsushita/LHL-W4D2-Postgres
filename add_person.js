const settings = require("./settings");
const arg = process.argv.slice(2);

const knex = require('knex') ({
  client: 'pg',
  connection: {
    host: settings.hostname,
    user: settings.user,
    password: settings.password,
    database: settings.database
  }
});


const fName = arg[0];
const lName = arg[1];
const bDate = arg[2];


knex('famous_people').insert([{
  'first_name': fName,
  'last_name': lName,
  'birthdate': bDate
}])
.asCallback((err, rows) => {
  if (err) {
    return console.error(err);
  }
});
