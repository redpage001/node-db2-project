const express = require("express");
const db = require("../data/dbConnection");

const router = express.Router();

router.get('/', (req, res) => {
    db("Cars")
        .then(cars => {
            res.status(200).json({ data: cars })
        })
        .catch(error => {
            console.log({ error })
            res.status(500).json({ message: "Error retrieving cars." })
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;

    db("Cars")
        .where({id})
        .first()
        .then(car => {
            if(car){
                res.status(200).json({ data: car })
            } else {
                res.status(404).json({ message: "Car with specified ID not found." })
            }
        })
        .catch(error => {
            console.log({ error })
            res.status(500).json({ message: "Error retrieving car with specified ID." })
        })
})

router.post('/', validateCar, (req, res) => {
    const { VIN, Make, Model, Mileage, Transmission_Type, Status_of_Title } = req.body;

    db("Cars")
        .insert({ VIN, Make, Model, Mileage, Transmission_Type, Status_of_Title }, "id")
        .then(([id]) => {
            db("Cars")
                .where({ id: id })
                .first()
                .then(newCar => {
                    if (newCar) {
                        res.status(200).json({ data: newCar })
                    } else {
                        res.status(404).json({ message: "New car was not found." })
                    }
                })
                .catch(error => {
                    console.log({ error })
                    res.status(500).json({ message: "Error finding new car." })
                })
        })
        .catch(error => {
            console.log({ error })
            res.status(500).json({ message: "Error creating new car." })
        })
})

router.put('/:id', validateCar, (req, res) => {
    const { VIN, Make, Model, Mileage, Transmission_Type, Status_of_Title } = req.body;
    const { id } = req.params;

    db("Cars")
        .where({ id: id })
        .update({ VIN, Make, Model, Mileage, Transmission_Type, Status_of_Title })
        .then(count => {
            if (count) {
                db("Cars")
                    .where({ id: id })
                    .first()
                    .then(updatedCar => {
                        if(updatedCar) {
                            res.status(200).json({ data: updatedCar })
                        } else {
                            res.status(404).json({ message: "Updated car not found." })
                        }
                    }) 
                    .catch(error => {
                        console.log({ error })
                        res.status(500).json({ message: "Error finding updated car." })
                    })
            }
        })
        .catch(error => {
            console.log({ error })
            res.status(500).json({ message: "Error updating car." })
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    db("Cars")
        .where({id: id})
        .del()
        .then(count => {
            if(count) {
                res.status(204).end()
            } else {
                res.status(404).json({ message: "Car with specified ID was not found."})
            }
        })
        .catch(error => {
            console.log({ error })
            res.status(500).json({ message: "Error deleting car." })
        })
})

//CUSTOME MIDDLEWARE//

function validateCar(req, res, next) {
    const { VIN, Make, Model, Mileage } = req.body;

    if(Object.entries(req.body).length === 0) {
        res.status(400).json({ message: "No car data available." })
    } else if( !VIN || !Make || !Model || !Mileage ) {
        res.status(400).json({ message: "VIN, Make, Model, and Milage are all required." })
    } else if( VIN.length > 17 || VIN.length < 11 ) {
        res.status(400).json({ message: "VIN must be between 11 and 17 characters long." })
    } else {
        next();
    }
}

module.exports = router;