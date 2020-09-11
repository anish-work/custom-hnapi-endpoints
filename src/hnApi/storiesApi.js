import { keyValueReducer, sortByKey } from "../utilFuncs";
import { getItemById, getNewStoriesID } from "./utilHnApi";

//Get <param> number of sorted stories from all new stories
export async function getTopStories(num) {
  try {
    console.log("Fetching IDs");
    //Store all ids in array
    const idsArray = await getNewStoriesID();

    //Fetch all stories and store
    console.log("Fetching Stories");
    let stories = await Promise.all(idsArray.map(getItemById));
    if (stories) {
      //Reduce key value pairs for fast sorting (meh..) imported from utilFuncs.js
      stories = keyValueReducer(stories);

      //Sort and return the specified amount of stories by the client imported from utilFuncs.js
      console.log("Sorting Stories");
      return await sortByKey(stories, "score", num);
    }
  } catch (err) {
    throw new Error(err.message + ` at getTopStories() (${__filename} ).`);
  }
}
