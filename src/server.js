require("dotenv/config");
const http = require("http");
const app = require("./app");

var PORT = process.env.PORT || 3333;

http.createServer(app).listen(PORT, () => {
  console.log(`APP listenner on port ${PORT}`);
});
