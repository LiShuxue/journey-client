const mongoose = require('mongoose');
const db_config = require('./db_config');

mongoose.connect('mongodb://' + db_config.host + ':' + db_config.port + '/' + db_config.name);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('DB connected...')
});

module.exports = db;