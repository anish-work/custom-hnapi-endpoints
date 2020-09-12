import { getItemById, userHnAge } from "./utilHnApi";
import { sortByKey } from "../utilFuncs";

//
// C O M M E N T S   A P

async function getParents(itemIds) {
  return await Promise.all(itemIds.map((x) => getItemAndStore(x, new Set())));
}

async function getItemAndStore(itemId, result) {
  let item = await getItemById(itemId);
  result.add(item);
  console.log(result.size, item.id, !item.kids, item.deleted);
  if (!item.kids || item.deleted) {
    return;
  }
  await Promise.all(item.kids.map((id) => getItemAndStore(id, result)));
}

export async function getDetails(commentID) {
  console.log(`Getting details of ${commentID} `);
  let count = 0;
  try {
    await childCount(commentID);
    return {
      id: commentID,
      childCount: count,
      user: commentID.by,
      text: commentID.text,
    };
  } catch (err) {
    return console.error(
      err.message + `at getCommentDetails() (${__filename})`
    );
  }

  //R E C U R S I V E
  //
  //C O D E
  //
  //B E L O W

  //(getDetails): Counts the Kids and grand kids **define count externally for this func**
  async function childCount(id) {
    try {
      const result = await getItemById(id);
      console.log(result.kids);
      if (!result.kids) return;
      if (result.deleted) return count--;
      count += result.kids.length;
      for (let i = 0; i < result.kids.length; i++) {
        console.log(count);
        console.log("going in child");
        await childCount(result.kids[i]);
      }
    } catch (err) {
      console.log(err.message + ` at childCount() (${__filename})`);
    }
    //Should incr count each time recursion occurs
  }
  //Should return { id: 11111, kidsCount:10, by: 'Anish', text:'bla bla bla', hnAge: 1Years 2 months}
}

//Count the total comments in each thread of the given <param> comments array
async function getCommentDetails(commentsArray) {
  //Count the number of children of each comment in the commentsArray <param>
  if (commentsArray) {
    try {
      console.info("Getting Comments details, please wait ..");
      return await Promise.all(commentsArray.map(getDetails));
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
//T O P  L E V E L  F U N C T I O N

//Fetch top <param2> number of Parent comments from <param1> story id
export async function getTopParentComments(id, num) {
  console.log("Requesting Comments API");
  //Fetch Story Detail from hnApi
  const story = await getItemById(id);
  if (story.type !== "story")
    return "Given item ID is not a story, please input a valid story ID";

  return (await getCount(story.kids)).toString();
  // const parentComments = await getCommentDetails(story.kids);
  // if (parentComments.length > 10) {
  //   return sortByKey(parentComments, "childCount", num);
  // } else {
  //   return sortByKey(parentComments, "kidsCount", parentComments.length);
  // }
}
