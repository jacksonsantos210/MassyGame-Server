import "dotenv/config";
import Queue from "./lib/Queue";
import RecoveryPlayerMail from "./app/jobs/RecoveryPlayerMail";

Queue.process(RecoveryPlayerMail.handle);
