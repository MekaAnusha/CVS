const { listMovies, getMovieById, searchMovies } = require('../services/movieService');

async function getAllMovies(req, res) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 50;
  try {
    const movies = await listMovies(page, limit);
    res.json({ page, data: movies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
}

async function getMovieDetails(req, res) {
    //console.log(`params ${req.params}`);
    const { id } = req.params;
  
    try {
      const movie = await getMovieById(id);
  
      if (!movie) {
        return res.status(404).json({ error: 'Movie not found' });
      }
  
      res.json(movie);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch movie details' });
    }
  }

  async function searchMoviesController(req, res) {
    console.log('query',req.query);
    const {
      year,
      genre,
    } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    try {
      const results = await searchMovies({
        year,
        genre,
        limit,
        page
      });
  
      res.json({ page, results });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Search failed' });
    }
  }

module.exports = { getAllMovies, getMovieDetails, searchMoviesController };
