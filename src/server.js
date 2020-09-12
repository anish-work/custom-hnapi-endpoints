import { app } from "./app";
import { flushAll } from "./cache";

const SERVER_PORT = process.env.SERVER_PORT || 3000;
//Run the Server
const server = app.listen(SERVER_PORT, () => {
  console.log(`Listening on port ${SERVER_PORT}`);
});

//catching signals and flush the cache before closing
process.on("SIGINT", () => {
  flushAll();
  server.close();
});
