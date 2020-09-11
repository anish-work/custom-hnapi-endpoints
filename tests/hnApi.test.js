import { getNewStoriesID, getItemById, getUser } from "../src/hnApi/utilHnApi";
import axios from "axios";
import "regenerator-runtime/runtime";
import { ids, stories, user } from "./testData";

jest.mock("axios");

describe("Calls to hnApi", () => {
  test("Ids from hnApi are successfully fetched ", async () => {
    const res = { data: ids };
    axios.get.mockResolvedValue(res);
    getNewStoriesID().then((data) => expect(data).toEqual(ids));
  });

  test("Item for a given id is successfully fetched", async () => {
    const res = { data: stories[0] };
    axios.get.mockImplementationOnce(() => Promise.resolve(res));
    await expect(getItemById(1)).resolves.toEqual(stories[0]);
  });

  test("User is fetched from hn API and required keys are filtered", async () => {
    const res = { data: user };
    axios.get.mockImplementationOnce(() => Promise.resolve(res));
    await expect(getUser("jl")).resolves.toEqual({
      id: "jl",
      created: 1173923446,
    });
  });
});
