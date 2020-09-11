import { app } from "./app";

const SERVER_PORT = process.env.SERVER_PORT || 3000;
//Run the Server
app.listen(SERVER_PORT, () => {
  console.log(`Listening on port ${SERVER_PORT}`);
});
