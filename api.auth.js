const {
  models: { Student },
} = require('./db');
const { comparePasswords } = require('./bcrypt');
const app = require('express').Router();
const jwt = require('jwt-simple');

// login and generate a new JWT
app.post('/', (req, res, next) => {
  const { email, password: plain } = req.body;
  Student.findOne({ where: { email } })
    .then(({ id, password, email, firstName, lastName }) => {
      comparePasswords(plain, password).then(result => {
        if (result) {
          const token = jwt.encode({ id }, process.env.JWT_SECRET);
          // sending the token back as a cookie instead of storing on localStorage for security reasons
          // the httponly flag prevents javascript from accessing the cookie. This helps prevent XSS attacks
          // https://owasp.org/www-community/HttpOnly
          res.cookie('jwt', token, { httpOnly: true });
          res.status(200).send({ user: { email, firstName, lastName } });
        } else res.status(401).send({ error: 'authentication failed' });
      });
    })
    .catch(err => {
      console.error(err);
      next(err);
    });
});

// if a user has logged in previously they will have a jwt cookie on their computer
// the browser automatically attaches any relevant cookies to the server any time it makes a request
// this is how we maintain persistent login (staying logged in on refresh or re-opening the browser)
// this route checks that the jwt cookie is valid and sends back the relevant user data
app.get('/', (req, res, next) => {
  const jwtToken = req.cookies['jwt'];
  if (jwtToken) {
    const userData = jwt.decode(jwtToken, process.env.JWT_SECRET);
    Student.findOne({ where: { id: userData.id } })
      .then(student => {
        if (!student) {
          return res.status(400).send({ error: 'user not found' });
        }
        const { firstName, lastName, email } = student;
        res.status(200).send({ user: { firstName, lastName, email } });
      })
      .catch(next);
  } else {
    res.status(401).send({ error: 'authentication failed' });
  }
});

// deletes the jwt cookie from the users browser
app.delete('/', (req, res, next) => {
  console.log('clearing cookie');
  res.clearCookie('jwt');
  res.status(200).send({ message: 'cookie cleared' });
});

// try going to this route while logged out then log in and check again.
app.get('/test', (req, res, next) => {
  const authStatus = { authorized: false, userId: '' };
  if (req.user) {
    authStatus.authorized = true;
    authStatus.userId = req.user.id;
  }
  res.status(200).send(authStatus);
});
module.exports = app;
