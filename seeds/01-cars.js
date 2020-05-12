
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('Cars').insert([
        { VIN: "VIN1MND1030122001", 
        Make: "Car Make", 
        Model: "Car Model", 
        Mileage: "12000 miles", 
        transmission_type: "Car Transmission",
        Status_of_Title: "Car Status"
        },
        { VIN: "VIN2SECONDVIN1234", 
        Make: "Second Car Make", 
        Model: "Second Car Model", 
        Mileage: "22000 miles", 
        transmission_type: "Second Car Transmission",
        Status_of_Title: "Second Car Status"
        },
        { VIN: "VIN2THIRDVIN12345", 
        Make: "Third Car Make", 
        Model: "Third Car Model", 
        Mileage: "22000 miles", 
        transmission_type: "Third Car Transmission",
        Status_of_Title: "Third Car Status"
        }
      ]);
    });
};
