const express = require('express');

const db = require('../dbConfig');

const router = express.Router();

router.get('/', (req, res) => {
  db.select('*')
    .from('cars')
    .then(cars => {
      res.status(200).json(cars);
    })
    .catch(err => {
      res.status(500).json({ error: 'Failed to retrieve cars' });
    });
});
router.get('/:id', validateVehicleId, (req, res) => {
  db.select('*')
    .from('cars')
    .where('id', '=', req.params.id)
    .then(cars => {
      res.status(200).json(cars);
    })
    .catch(err => {
      res.status(500).json({ error: 'Failed to retrieve car from database' });
    });
});
router.post('/', validatePostReq, (req, res) => {
  db('cars')
    .insert(req.body)
    .then(car => {
      res.status(201).json(car);
    })
    .catch(err => {
      res.status(500).json({ error: 'Failed to add new car' });
    });
});
router.put('/:id', validateVehicleId, validatePostReq, (req, res) => {
  db('cars')
    .where({ id: req.params.id })
    .update(req.body)
    .then(car => {
      res.status(200).json(car);
    })
    .catch(err => {
      res.status(500).json({ error: 'Failed to update car' });
    });
});
router.delete('/:id', validateVehicleId, (req, res) => {
  db('cars')
    .where({ id: req.params.id })
    .del()
    .then(car => {
      res.status(200).json(car);
    })
    .catch(err => {
      res.status(500).json({ error: 'Failed to delete car' });
    });
});

// Middleware
function validateVehicleId(req, res, next) {
  if (req.params.id) {
    next();
  } else {
    res.status(404).json({ message: 'Invalid Vehicle ID' });
  }
}

function validatePostReq(req, res, next) {
  if (!req.body.vin || !req.body.make || !req.body.model || !req.body.mileage) {
    res.status(400).json({
      errorMessage: 'Please provide vin, make, model and mileage.'
    });
    next();
  }
}

module.exports = router;
