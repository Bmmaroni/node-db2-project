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
    res.json({
      message: "VIN is missing"
    })
  } else if (!req.body.make) {
    res.json({
      message: "Make is missing"
    })
  } else if (!req.body.model) {
    res.json({
      message: "Model is missing"
    })
  } else if (!req.body.mileage) {
    res.json({
      message: "Mileage is missing"
    })
  }
  next()
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  const isValidVin = vinValidator.validate(`${req.body.vin}`)
  if (!isValidVin) {
    res.status(404).json({
      message: `vin ${req.body.vin} is invalid`
    })
  }
  next()
}

const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
  const uniqueVin = req.cars.map(cars => cars.vin == req.body.vin)
  if (!uniqueVin) {
    res.status(400).json({
      message: `vin ${req.body.vin} already exists`
    })
  }
  next()
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}