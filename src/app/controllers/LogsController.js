const Log = require("../models/Log");

class LogsController {
  async save(action, information, level = "player") {
    await Log.create({
      action: action,
      information: information,
      level: level,
    });
  }
}
