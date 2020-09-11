import { Router } from "express";
import { getFromCache } from "../cache";

const router = Router();

router.get("/", cacheMiddleWare);

//Middleware for Cache Data
function cacheMiddleWare(req, res) {
  getFromCache("snapshot").then((data) => {
    if (data) {
      try {
        res.send(data);
      } catch (error) {
        throw error;
      }
    } else {
      console.log("Cache is empty");
      res.send("No data here yet, hit /top-stories.");
    }
  });
}

export default router;
