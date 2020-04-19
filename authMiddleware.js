const jwt = require('jwt-simple');

const checkAuth = (req, res, next) => {
  req.user = null;
  const jwtToken = req.cookies['jwt'];
  if (jwtToken) {
    const userData = jwt.decode(jwtToken, process.env.JWT_SECRET);
    req.user = userData;
  }
  next();
};

module.exports = { checkAuth };
