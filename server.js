var express = require("express");
var app = express();

app.use(express.static('./dist/chatcord'));

app.get('/*', function (req, res) {
  res.sendFile('index.html', { root: 'dist/chatcord/' }
  );
});

// Initialize the app.
app.listen(process.env.PORT || 4200, function () {
  console.log("App now running on port");
});
