'use strict';
var mongoose = require("mongoose");
var URL = "mongodb://frogsolutions:fedeputo123@@ds255320.mlab.com:55320/jesus-bdd";
mongoose.connect(URL);
module.exports = mongoose;