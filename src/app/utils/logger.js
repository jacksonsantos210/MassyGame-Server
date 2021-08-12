const bunyan = require("bunyan");
const game = bunyan.createLogger({
  name: "game",
  streams: [
    {
      level: "info",
      path: "/Volumes/Data/_Workspace_/_Projects/3sDigital/Vulkan/MasseyGame/server/logs.log", // log ERROR and above to a file
    },
    {
      level: "error",
      path: "/Volumes/Data/_Workspace_/_Projects/3sDigital/Vulkan/MasseyGame/server/errors.log", // log ERROR and above to a file
    },
  ],
});

const admin = bunyan.createLogger({
  name: "admin",
  streams: [
    {
      level: "info",
      path: "/Volumes/Data/_Workspace_/_Projects/3sDigital/Vulkan/MasseyGame/server/logs.log", // log ERROR and above to a file
    },
    {
      level: "error",
      path: "/Volumes/Data/_Workspace_/_Projects/3sDigital/Vulkan/MasseyGame/server/errors.log", // log ERROR and above to a file
    },
  ],
});

class Logger {
  game(level, msg) {
    if (level === "error") {
      game.error(msg);
    } else {
      game.info(msg);
    }
  }

  admin(level, msg) {
    if (level === "error") {
      admin.error(msg);
    } else {
      admin.info(msg);
    }
  }
}

module.exports = new Logger();
