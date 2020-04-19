require('dotenv').config('');
const port = process.env.PORT || 3000;
const { syncAndSeed } = require('./db');
console.log('jwt secret', process.env.JWT_SECRET);

if (process.env.RESEED === 'true') {
  console.log('syncing and seeding');
  syncAndSeed();
}

require('./app').listen(port, () => console.log(`listening on port ${port}`));
