// Dependencies
// ======================================================

var express = require("express");

// Express Startup
var app = express();
var PORT = process.env.PORT || 3000;

// Express handling
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

require("./routes/api_routes")(app);
require("./routes/html_routes")(app);

// Start server and begin listening
app.listen(PORT, function () {
  console.log(`Server listening on port:${PORT}`);
});
