const db = require("../../data/db-config")

const getAll = async () => {
  // DO YOUR MAGIC
  return (await db("cars"))
}

const getById = (id) => {
  // DO YOUR MAGIC
  return db("cars")
    .where("id", id)
    .first()
}

const create = async (car) => {
  // DO YOUR MAGIC
  const newCar = await db
    .insert({
      vin: car.vin,
      make: car.make,
      model: car.model,
      mileage: car.mileage,
      title: car.title,
      transmission: car.transmission
    })
    .into("cars")
    return newCar
};

module.exports = {
  getAll,
  getById,
  create
}