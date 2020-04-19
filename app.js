const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();
const { checkAuth } = require('./authMiddleware');

app.use(express.json());

module.exports = app;

// cookie parser populates req.cookies with incoming cookies
app.use(cookieParser());
// checkAuth attaches userData to req.user if there is a valid JWT
// if your jwt has an expiration this middleware could also refresh the token
app.use(checkAuth);
app.use((req, res, next) => {
  console.log('req.user:', req.user);
  next();
});
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.get('/', (req, res, next) =>
  res.sendFile(path.join(__dirname, 'index.html'))
);
app.use('/api', require('./api'));

app.use((err, req, res, next) => {
  res.status(err.status || 500).send({ error: err });
});
