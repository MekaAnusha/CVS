const express = require('express');
const movieRoutes = require('./routes/movieRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/movies', movieRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
