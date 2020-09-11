import { getItemById, userHnAge } from "./utilHnApi";
import { sortByKey } from "../utilFuncs";

//
// C O M M E N T S   A P I

//Returns object containing childCount, user, text, id from given <param> id
export async function getDetails(commentID) {
  const comment = await getItemById(commentID);

  //Destructure properties of comments
  const { id, by, text, kids } = comment;

  //Calculate user Age right here to reduce iteration again
  const hnAge = await userHnAge(by);

  //Count total kids
  console.log(`Counting kids of ${id}`);
  let count = 0;
  if (kids === undefined) {
    const kidsCount = count;
    return { id, by, hnAge, kidsCount, text };
  }
  try {
    await Promise.all(kids.map(childCount));
    const kidsCount = count;
    return { id, by, hnAge, kidsCount, text };
  } catch (err) {
    return console.error(err.message + `at getCommentDetail() (${__filename})`);
  }

  //R E C U R S I V E
  //
  //C O D E
  //
  //B E L O W

  //(getThreadLength): Counts the Kids and grand kids **define count externally for this func**
  async function childCount(id) {
    try {
      const result = await getItemById(id);
      if (result.kids === undefined) return;
      for (let i = 0; i < result.kids.length; i++) {
        count++;
        await childCount(result.kids[i], count);
      }
    } catch (err) {
      console.log(err.message + ` at childCount() (${__filename})`);
    }
    //Should incr count each time recursion occurs
  }
  //Should return { id: 11111, kidsCount:10, by: 'Anish', text:'bla bla bla', hnAge: 1Years 2 months}
}

//Count the total comments in each thread of the given <param> comments array
async function getCommentDetails(commentArray) {
  //Count the number of children of each comment in the commentArray <param>
  if (commentArray !== undefined) {
    try {
      console.info("Getting Comments details, please wait ..");
      return await Promise.all(commentArray.map(getDetails));
    } catch (err) {
      console.error(err.message + `at getComments() (${__filename})`);
    }
  } else {
    return "There are no comments on this story";
  }
}
//
//
//
//H I G H E S T  O R D E R  F U N C T I O N

//Fetch top <param2> number of Parent comments from <param1> story id
export async function getTopParentComments(id, num) {
  console.log("Requesting Comments API");
  //Fetch Story Detail from hnApi
  const story = await getItemById(id);
  if (story.type !== "story")
    return "Given item ID is not a story, please input a valid story ID";

  const parentComments = await getCommentDetails(story.kids);
  if (parentComments.length > 10) {
    return sortByKey(parentComments, "kidsCount", num);
  } else {
    return sortByKey(parentComments, "kidsCount", parentComments.length);
  }
}
