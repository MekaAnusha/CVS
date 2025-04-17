const db = require('../utils/db');

function listMovies(page = 1, limit = 50) {
  const offset = (page - 1) * limit;

  const query = `
    SELECT imdbId, title, genres, releaseDate, '$' || budget AS budget
    FROM movies
    LIMIT ? OFFSET ?
  `;

  return new Promise((resolve, reject) => {
    db.all(query, [limit, offset], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

function getMovieById(movieId) {
  const query = `
    SELECT 
      m.imdbId,
      m.title,
      m.overview AS description,
      m.releaseDate,
      '$' || m.budget AS budget,
      m.runtime,
      (
        SELECT ROUND(AVG(r.rating), 2)
        FROM ratings r
        WHERE r.movieId = m.movieId
      ) AS averageRating,
      m.genres,
      m.language,
      m.productionCompanies
    FROM movies m
    WHERE m.movieId = ?
  `;

  return new Promise((resolve, reject) => {
    db.get(query, [movieId], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

function searchMovies({ year, genre, limit = 50, page = 1 }) {
  const offset = (page - 1) * limit;
  const conditions = [];
  const params = [];

  if (year) {
    conditions.push("strftime('%Y', releaseDate) = ?");
    params.push(String(year));
  }

  if (genre) {
    conditions.push("genres LIKE ?");
    params.push(`%${genre}%`);
  }
  console.log("params", params)
  const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
  console.log("whereClause", whereClause)
  const query = `
    SELECT imdbId, title, genres, releaseDate, '$' || budget AS budget
    FROM movies
    ${whereClause}
    ORDER BY releaseDate ASC
    LIMIT ? OFFSET ?
  `;

  return new Promise((resolve, reject) => {
    db.all(query, [...params, limit, offset], (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

module.exports = { listMovies, getMovieById, searchMovies };


