var express = require("express");
var app = express();


// Initialize the app.
var server = app.listen(process.env.PORT || 4200, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});