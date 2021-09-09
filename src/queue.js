require("dotenv/config");
const Queue = require("./lib/Queue");
const RecoveryPlayerMail = require("./app/jobs/RecoveryPlayerMail");

Queue.process(RecoveryPlayerMail.handle);
