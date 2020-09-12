import { getItemById, userHnAge } from "./utilHnApi";
import { sortByKey } from "../utilFuncs";

//Count all the children
async function countChildren(itemId, result) {
  result.count += 1;
  
  let item = await getItemById(itemId);
  
  if (item.kids && !item.deleted) {
    await Promise.all(item.kids.map((id) => countChildren(id, result)));
  }

  return item;
}


//T O P  L E V E L  F U N C T I O N

//Fetch top <param2> number of Parent comments from <param1> story id
export async function getTopParentComments(id, num) {
  console.log("Requesting Comments API");
  //Fetch Story Detail from hnApi
  const story = await getItemById(id);
  if (story.type !== "story")
    return "Given item ID is not a story, please input a valid story ID";
  //Performance measure
  let s = performance.now();

  let parents = await Promise.all(story.kids.map(async function(x) {
      let result = {count: -1};
      let item = await countChildren(x, result);
      return {
        id:item.id,
        childCount: result.count,
        author: item.by,   
        text: item.text     
      };
    })
  );

  await Promise.all(parents.map(async (item) => {
    item.hnAge = await userHnAge(item.author);
  }));

  if(story.kids.length > 10){
    return sortByKey(parents, 'childCount', num);
  }else{
    return sortByKeyFN(parents, 'childCount', story.kids.length);
  }
  
}