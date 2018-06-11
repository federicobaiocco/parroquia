'use strict';
var mongoose = require("mongoose");
var URL = "mongodb://federico:telmio445283@ds119772.mlab.com:19772/parroquia";
mongoose.connect(URL);
module.exports = mongoose;