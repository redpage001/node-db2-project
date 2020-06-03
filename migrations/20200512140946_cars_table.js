
exports.up = function(knex) {
    return knex.schema.createTable("Cars", tbl => {
        tbl.increments();
  
        tbl.text("VIN", 17).notNullable().unique();
        tbl.text("Make", 125).notNullable();
        tbl.text("Model", 125).notNullable();
        tbl.text("Mileage", 125).notNullable();
        tbl.text("Transmission_Type", 125);
        tbl.text("Status_of_Title", 125);
  
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists("Cars");
  };
  