import express from "express";
import cors from "cors";

import routes from "./routes";
import "./hnApi/utilHnApi";
import "./routes/comments";

export const app = express();
//Enable cors requests on the server
app.use(cors());

app.use("/top-stories", routes.topStories);
app.use("/past-stories", routes.pastStories);
app.use("/comments", routes.comments);

import "./hnApi/commentsApi";
