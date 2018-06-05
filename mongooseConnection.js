'use strict';
var mongoose = require("mongoose");
var URL = "mongodb://localhost/SociedadSanJuan";
mongoose.connect(URL);
module.exports = mongoose;