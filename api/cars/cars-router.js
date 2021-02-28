// DO YOUR MAGIC
const router = require("express").Router()
const db = require("./cars-model")
const { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique } = require("./cars-middleware")

router.get('/', async (req, res, next) => {
  try {
    res.json(await db.getAll())

  } catch (err) {
      next(err)
  }
})

router.get('/:id', checkCarId, (req, res, next) => {
  try {
    const car = await db.getById(req.params.id)
    res.json(car)

  } catch (err) {
      next(err)
  }
})

router.post('/', checkVinNumberValid, checkVinNumberUnique, checkCarPayload, (req, res, next) => {
  try {
    const car = await db.create({
      vin: req.body.vin.trim(),
      make: req.body.make.trim(),
      model: req.body.model.trim(),
      mileage: req.body.mileage.trim(),
      title: req.body.title,
      transmission: req.body.transmission
    })
    res.status(201).json(car)

  } catch (err) {
      next(err)
  }
})

router.use((err, req, res, next) => {
  res.status(500).json({
    message: "something went wrong inside the cars router",
    errMessage: err.message
  })
})

module.exports = router