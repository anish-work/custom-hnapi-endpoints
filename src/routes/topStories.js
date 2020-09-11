import { getTopStories } from "../hnApi/storiesApi";
import { Router } from "express";
import { getFromCache, setTemporaryCache } from "../cache";

const router = Router();

router.get("/", cacheMiddleWare, storiesMiddleware);

//Request Hacker news Api if cache is empty
async function storiesMiddleware(req, res) {
  const response = await getTopStories(10).catch((err) => {
    res.send("Server did not responded, Please try again!");
    throw err;
  });
  if (response.length > 0) {
    //Converted to string and stored to Cache
    setTemporaryCache("freshData", JSON.stringify(response), 600);

    //Response sent to request
    res.send(response);
    console.log("Response sent successfully from HN Api ");
  }
}

//Middleware for Cache Data
function cacheMiddleWare(req, res, next) {
  getFromCache("freshData").then((data) => {
    if (data) {
      try {
        res.send(data);
        console.log("Data fetched from cache");
      } catch (error) {
        throw error;
      }
    } else {
      console.log("Cache is empty");
      next();
    }
  });
}

export default router;
