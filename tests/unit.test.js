import { keyValueReducer, sortByKey } from "../src/utilFuncs";
import { reducedKeysStories, stories } from "./testData";

describe("Logic tests", () => {
  test("Array should be sorted by score", () => {
    let arr = sortByKey(stories, "score", 5);
    expect(arr[0].score).toEqual(500);
    expect(arr[1].score).toEqual(100);
    //In the input array 100 was at 0 index
  });

  test("Keys are filtered from the incoming array of objects", () => {
    let arr2 = keyValueReducer(stories);
    expect(arr2).toEqual(reducedKeysStories);
    //In input there were was some extra keys present in objects
  });
});
