const pg = require("pg");
const settings = require("./settings"); // settings.json
const arg = process.argv.slice(2);

const client = new pg.Client({
  user: settings.user,
  password: settings.password,
  database: settings.database,
  host: settings.hostname,
  port: settings.port,
  ssl: settings.ssl
});

// function that returns a string of an user's request result
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

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("select * from famous_people where last_name = $1", [String(arg)], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }

    // print the information of request result
    console.log(getInfo(result.rows[0]));

    client.end();
  });
});