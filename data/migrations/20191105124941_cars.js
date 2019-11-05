exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl => {
    tbl.increments();
    tbl.string('vin', 128).notNullable();
    tbl.string('make', 64).notNullable();
    tbl.string('model', 64).notNullable();
    tbl.float('mileage', 255).notNullable();
    tbl.string('transmission type', 64);
    tbl.string('title', 64);
    tbl.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableItExists('cars');
};
