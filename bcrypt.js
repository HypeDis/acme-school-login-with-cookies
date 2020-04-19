const bcrypt = require('bcrypt');
// wrapping bcrypt methods in promises
function generateHash(plain) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(plain, 10, (err, hash) => {
      if (err) return reject(err);
      if (!hash) return reject(new Error('could not hash pw '));
      resolve(hash);
    });
  });
}

function comparePasswords(plain, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plain, hash, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}

module.exports = { generateHash, comparePasswords };
