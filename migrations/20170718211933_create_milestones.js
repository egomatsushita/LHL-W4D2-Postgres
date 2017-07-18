
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('milestones', (table) => {
      table.increments('id');
      table.string('description', 255).notNullable();
      table.date('date_achieved');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('milestones');
};
