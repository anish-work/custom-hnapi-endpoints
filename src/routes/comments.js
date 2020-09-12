import { Router } from "express";
import { getTopParentComments } from "../hnApi/commentsApi";

const router = Router();

router.get("/:storyID", commentsMiddleware);

async function commentsMiddleware(req, res) {
  const { storyID } = req.params;
  try {
    const response = await getTopParentComments(storyID, 10);
    console.log("Fetched completed from comments Api");
    res.send(response);
  } catch (e) {
    console.log(e.message);
    res.send("Server error, Please try again!");
  }
}

export default router;
