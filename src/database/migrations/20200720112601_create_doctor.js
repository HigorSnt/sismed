exports.up = function (knex) {
  return knex.schema.createTable('doctor', function (table) {
    table.string('crm').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('password_hash').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('doctor');
};
