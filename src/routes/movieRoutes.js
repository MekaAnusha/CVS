const express = require('express');
const router = express.Router();
const { getAllMovies, getMovieDetails, searchMoviesController } = require('../controllers/movieController');

router.get('/', getAllMovies);
router.get('/search', searchMoviesController);
router.get('/:id', getMovieDetails); 

module.exports = router;
