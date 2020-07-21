exports.up = function (knex) {
  return knex.schema.createTable('patient', function (table) {
    table.string('email').primary();
    table.string('name').notNullable();
    table.string('password_hash').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('patient');
};
