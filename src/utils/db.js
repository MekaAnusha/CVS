const sqlite3 = require('sqlite3').verbose();
const path = require('path');
require('dotenv').config();

const db = new sqlite3.Database(path.resolve(__dirname, '../../', process.env.MOVIES_DB_PATH), (err) => {
  if (err) {
    console.error('Error opening movies database:', err.message);
  } else {
    console.log('Connected to movies database.');

    const ratingsPath = path.resolve(__dirname, '../../', process.env.RATINGS_DB_PATH);
    db.exec(`ATTACH DATABASE '${ratingsPath}' AS ratingsDB`, (err) => {
      if (err) {
        console.error('Failed to connect to ratings database:', err.message);
      } else {
        console.log('Connected to Ratings database.');
      }
    });
  }
});

module.exports = db;
