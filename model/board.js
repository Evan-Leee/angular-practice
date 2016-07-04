'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var boardSchema = new Schema ({
  id: Number,
  name: String,
  owner: String,
  desc: String,
  createOn: String
});

module.exports = mongoose.model('board', boardSchema);