const settings = require("./settings");
const arg = process.argv.slice(2)[0];

const knex = require('knex') (require('./knexfile').development);

const getInfo = (result) => {
  let info = `Searching ...\n`;
  info += `Found 1 person(s) by the name '${arg}'\n`;

  const person = result;
  const id = person.id;
  const first_name = person.first_name;
  const last_name = person.last_name;
  const birth_date = person.birthdate.toISOString().split('T')[0];

  info += `- ${id}: ${first_name} ${last_name}, born '${birth_date}'\n`;

  return info;
}

knex.select('*').from('famous_people')
.where('last_name', '=', arg)
.asCallback((err, rows) => {
  if (err) {
    return console.error(err);
  }

  console.log(getInfo(rows[0]));
});