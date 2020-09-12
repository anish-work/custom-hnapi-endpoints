import { getItemById } from "./hnApi/utilHnApi";

//Helper function: Removes unnecessary key value pairs from array <arg> (crafted for this specific case only)

export function keyValueReducer(array) {
  return array.map((data) => {
    //Remove unnecessary key value pairs from the story
    return {
      score: data.score,
      timestamp: data.time,
      author: data.by,
      title: data.title,
      url: data.url,
      id: data.id,
    };
  });
}
//Helper function: Sort <param1> array by <param2> key and returns an array of <param3> length
export function sortByKey(array, key, length) {
  console.log("Sorting the array");
  if (array) {
    array.sort((a, b) => b[key] - a[key]);
    let result = [];
    //Filter out top 10 / 500
    for (let i = 0; i < length; i++) {
      result.push(array[i]);
    }
    return result;
  } else {
    throw new Error("Can not sort empty array");
  }
}
//Calculates the age from given <param> date but it should in JS Date format
export function calculateAge(inputDate) {
  console.log("Calculating user age");
  //Get current date for calculation
  const today = new Date();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  const inputMonth = inputDate.getMonth();
  const inputYear = inputDate.getFullYear();

  const ageYears = todayYear - inputYear;
  const ageMonth =
    inputMonth > todayMonth
      ? 12 - (inputMonth - todayMonth)
      : todayMonth - inputMonth;
  return `${
    ageYears === 1 ? ageYears + " Year" : ageYears + " Years"
  } ${ageMonth} Months`;
}
