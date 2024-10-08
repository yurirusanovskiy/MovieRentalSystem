const express = require('express');
const customerController = require('../controllers/customerController');
const movieController = require('../controllers/movieController');
const genreController = require('../controllers/genreController');
const rentalController = require('../controllers/rentalController');

const router = express.Router();

// CRUD for Customer
router.post('/customers', customerController.createCustomer);
router.get('/customers', customerController.getAllCustomers);
router.get('/customers/:id', customerController.getCustomerById);
router.put('/customers/:id', customerController.updateCustomer);
router.delete('/customers/:id', customerController.deleteCustomer);

// CRUD for Movie
router.post('/movies', movieController.createMovie);
router.get('/movies', movieController.getAllMovies);
router.get('/movies/:id', movieController.getMovieById);
router.put('/movies/:id', movieController.updateMovie);
router.delete('/movies/:id', movieController.deleteMovie);

// CRUD for Genre
router.post('/genres', genreController.createGenre);
router.get('/genres', genreController.getAllGenres);
router.get('/genres/:id', genreController.getGenreById);
router.put('/genres/:id', genreController.updateGenre);
router.delete('/genres/:id', genreController.deleteGenre);

// CRUD for Rental
router.post('/rentals', rentalController.createRental);
router.get('/rentals', rentalController.getAllRentals);
router.get('/rentals/:id', rentalController.getRentalById);
router.put('/rentals/:id', rentalController.updateRental);
router.delete('/rentals/:id', rentalController.deleteRental);

module.exports = router;
