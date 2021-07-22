console.log("Start APP Server");
require("dotenv/config");
const app = require("./app");

var PORT = process.env.APP_PORT || 3333;
app.listen(PORT, () => {
  console.log(`APP listenner on port ${PORT}`);
});
