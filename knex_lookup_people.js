const settings = require("./settings");
const knew = require('knex') ({
  client: settings.user,
  connection: {
    host: `${settings.hostname}${settings.port}`,
    user: settings.database,
    password: settings.password,
    database: 'famous_people'
  }
});