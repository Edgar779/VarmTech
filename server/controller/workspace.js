const config = require('../config/config');
const db = require("../models");
const Car = db.car;
const Op = db.Sequelize.Op;


exports.createCar = (req, res) => {
 
    const car = {
        brand: req.body.brandName,
        model: req.body.modelName,
        year: req.body.yearName,
        production: req.body.productionName,
        color: req.body.colorName,
        userId: req.body.userId,
    };
    Car.create(car)
    .then(data => {
        res.status(200).send({
            success: true,
            data: data,
            message: ""
          });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the car."
      });
    });
}


exports.deleteCar = (req, res) => {
console.log(req.body.id);
    Car.destroy(
        {where: {id: req.body.id}}
        )
        .then(nums => {
            if (nums == 1) {
            
                res.send({ message: `${nums} Car were deleted successfully!`, success: true});

              } else {
                res.send({
                  success: false,
                  message: `Cannot delete Car with id=${id}. Maybe Workspace was not found!`
                });
              }
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while removing Car"
          });
        });
    
}

exports.editCarOption = (req, res) => {
    console.log(req.body);
    Car.update(
        {model: req.body.model, year: req.body.year,production: req.body.production,color: req.body.color},
        
        {where: {id: req.body.id}}
    )
      .then(num => {
        if (num == 1) {
            
          res.send({
            success: true,
            message: "Car was updated successfully."
          });
        } else {
          res.send({
            success: false,
            message: `Cannot update Car with id=${id}. Maybe Car was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Car with id=" + id
        });
      });
}




exports.getCars = (req, res) => {
    Car.findAll({ where: { userId: req.body.id } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Cars."
      });
    });
}