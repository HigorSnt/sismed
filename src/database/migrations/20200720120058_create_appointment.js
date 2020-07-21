exports.up = function (knex) {
  return knex.schema.createTable('appointment', function (table) {
    table.increments('id').primary();

    table
      .string('doctor_crm')
      .notNullable()
      .references('crm')
      .inTable('doctor');

    table
      .string('patient_id')
      .notNullable()
      .references('id')
      .inTable('patient');

    table.string('date').notNullable();
    table.string('symptoms');
    table.string('prescription');
    table.boolean('done').defaultTo(false);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('appointment');
};
