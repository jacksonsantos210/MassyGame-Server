const Queue = require("bull");
const redisConfig = require("../config/redis");
const RecoveryPlayer = require("../app/jobs/RecoveryPlayerMail");

const RecoveryPlayerQueue = new Queue(RecoveryPlayer.key, redisConfig);

module.exports = RecoveryPlayerQueue;
