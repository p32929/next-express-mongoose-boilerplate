/**
 * Bluebird promise for mongoose promise operations
 */
const Promise = require("bluebird");
const mongoose = require("mongoose");
Promise.promisifyAll(mongoose);
mongoose.Promise = Promise;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

module.exports = mongoose;