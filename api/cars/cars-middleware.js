const cars = require("../cars/cars-model")
const vinValidator = require("vin-validator")

const checkCarId = (req, res, next) => {
  // DO YOUR MAGIC
  cars.getById(req.params.id)
      .then(car => {
        if (car) {
          req.car = car
          next()
        } else {
          res.status(404).json({
            message: `car with id ${req.params.id} is not found`
          })
        }
      })
      .catch(err => {
        res.status(500).json({
          message: "car id not found"
        })
      })
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  if (!req.body) {
    res.status(400)
  } else if (!req.body.vin) {
    res.status(400).json({
      message: "vin is missing"
    })
  } else if (!req.body.make) {
    res.status(400).json({
      message: "make is missing"
    })
  } else if (!req.body.model) {
    res.status(400).json({
      message: "model is missing"
    })
  } else if (!req.body.mileage) {
    res.status(400).json({
      message: "mileage is missing"
    })
  } else {
    next()
  }
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  var isValidVin = vinValidator.validate(req.body.vin)
  if (!isValidVin) {
    res.status(400).json({
      message: `vin ${req.body.vin} is invalid`
    })
  } else {
    next()
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  const allCars = await cars.getAll();
  const uniqueVin = allCars.filter(car => car.vin === req.body.vin)
  if (uniqueVin.length > 0) {
    return res.status(400).json({
      message: `vin ${req.body.vin} already exists`
    })
  } else {
    next()
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}