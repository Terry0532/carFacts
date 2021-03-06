// Requiring our models and passport as we've configured it
const db = require("../models");
const isAuthenticated = require("../config/middleware/isAuthenticated");
// Requiring path to so we can use relative routes to our HTML files
// const path = require("path");
const app = require("express");
const router = app.Router();
// const passport = require("../config/passport");

// View members vehicles
router.get("/vehicles", isAuthenticated, (req, res) => {
  res.render("vehicles");
});

//Route to get all vehicles
router.get("/api/allVehicles", (req, res) => {
  db.Vehicle.findAll({}).then(result => res.json(result));
});

router.get("/vehiclefind/:userid", (req, res) => {
  const userId = req.params.userid;
  db.Vehicle.findAll({
    where: {
      UserId: userId
    }
  }).then(result => {
    //console.log(result);
    res.send(result);
  });
});

router.get("/vehicles/:id", isAuthenticated, (req, res) => {
  const id = req.params.id;
  db.Vehicle.findAll({
    where: {
      id: id
    }
  }).then(() => res.render("vehicleDisplay"));
});

router.get("/vehicleid/:id", (req, res) => {
  const vehicleId = req.params.id;
  db.Vehicle.findAll({
    where: {
      id: vehicleId
    }
  }).then(result => {
    // console.log(result);
    res.send(result);
  });
});

// POST route for saving a new post
router.post("/api/postVehicle", (req, res) => {
  db.Vehicle.create({
    type: req.body.type,
    make: req.body.make,
    model: req.body.model,
    year: req.body.year,
    vin: req.body.vin,
    mileage: req.body.mileage,
    yearPurchased: req.body.yearPurchased,
    condition: req.body.condition,
    accidents: req.body.accidents,
    numOfOwners: req.body.numOfOwners,
    locationLastOwned: req.body.locationLastOwned,
    UserId: req.user.id
  }).then(dbPost => {
    console.log("Posting Vehicle");
    res.json(dbPost);
  });
});

// DELETE route for deleting posts
router.delete("/api/vehicles/:id", (req, res) => {
  db.Vehicle.destroy({
    where: {
      id: req.params.id
    }
  }).then(dbVehicle => {
    res.json(dbVehicle);
  });
});

// Get route for returning posts of a specific type
router.get("/api/allVehicles/type/:type", (req, res) => {
  db.Vehicle.findAll({
    where: {
      type: req.params.type
    }
  }).then(dbVehicle => {
    res.json(dbVehicle);
  });
});

module.exports = router;
