import Queue from "bull";
import redisConfig from "../config/redis";
import RecoveryPlayer from "../app/jobs/RecoveryPlayerMail";

const RecoveryPlayerQueue = new Queue(RecoveryPlayer.key, redisConfig);

export default RecoveryPlayerQueue;
