var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

/**
 * Worker Schema
 */
var WorkerSchema = new Schema({
  ip: String,
  state: Boolean
});

mongoose.model('Worker', WorkerSchema);