var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

/**
 * Game Schema
 */
var GameSchema = new Schema({
  worker: { type: ObjectId, ref: 'Worker' },
  code: Number
});

mongoose.model('Game', GameSchema);