import redis from "redis";
import "dotenv/config";
import { promisify } from "util";

const REDIS_PORT = process.env.REDIS_PORT || 6379;

const client = redis.createClient(REDIS_PORT);

//Redis do not support promises so util.promisify used to wait for data retrieval
const asyncGet = promisify(client.get).bind(client);

//Set <param1> key with data <param2> in cache for <param3> seconds, takes 'snapshot' key in cache and set this <param2> for later.
export function setTemporaryCache(key, data, durationInSeconds) {
  client.set(key, data);
  console.log("Stored on redis");
  //Snapshot and clear after <durationInSeconds>seconds
  if (durationInSeconds > 0) {
    //Convert the input actually into seconds
    const seconds = durationInSeconds * 1000;
    setTimeout(() => {
      client.set("snapshot", data);
      client.del(key);
      console.log("Cache cleared");
      console.log("Snapshot stored on redis");
    }, seconds);
  }
}

//Asynchronous get call from redis cache ,returns JSON.parsed value
export async function getFromCache(key) {
  let output = [];
  try {
    await asyncGet(key).then((data) => {
      return (output = data);
    });
  } catch (err) {
    throw err;
  }
  if (output) return JSON.parse(output);
}
