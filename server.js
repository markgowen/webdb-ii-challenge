const express = require('express');
const helmet = require('helmet');

const CarsRouter = require('./data/routes/cars-route');

const server = express();

server.use(express.json());
server.use(helmet);
server.use('/api/cars', CarsRouter);

module.exports = server;