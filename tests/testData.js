//Array of Ids just like HN Api
export const ids = [1, 2, 3, 4, 5];

//Array of objects having a key Score and values of 100,200,300,400,500
//Raw items like the HNApi
export const stories = [
  {
    id: 1,
    score: 100,
    time: 12345,
    by: "Xyz",
    title: "Random1",
    url: "example.com",
    kids: [123, 23, 4, 131, 24, 123],
    randomKey: ["RandomData", "Insider", "Dream job", "randoms"],
  },
  {
    id: 2,
    score: 500,
    time: 12345,
    by: "Xyz",
    title: "Random1",
    url: "example.com",
    kids: [123, 23, 4, 131, 24, 123],
    randomKey: ["RandomData", "Insider", "Dream job", "randoms"],
  },
];
export const reducedKeysStories = [
  {
    id: 2,
    score: 500,
    timestamp: 12345,
    author: "Xyz",
    title: "Random1",
    url: "example.com",
  },
  {
    id: 1,
    score: 100,
    timestamp: 12345,
    author: "Xyz",
    title: "Random1",
    url: "example.com",
  },
];
export const user = {
  about: "This is a test",
  created: 1173923446,
  delay: 0,
  id: "jl",
  karma: 2937,
  submitted: [
    8265435,
    8168423,
    8090946,
    8090326,
    7699907,
    7637962,
    7596179,
    7596163,
    7594569,
    7562135,
    7562111,
  ],
};
