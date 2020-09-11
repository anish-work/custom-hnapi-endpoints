import axios from "axios";

//API URL
const baseUrl = "https://hacker-news.firebaseio.com/v0/";
const newStoriesUrl = baseUrl + "newstories.json";

// S T O R I E S   A P I

//Get latest All Item IDs form hnApi
export async function getNewStoriesID() {
  try {
    return await axios.get(newStoriesUrl).then(({ data }) => data);
  } catch (e) {
    throw e.message;
  }
}

// Get a single item from a single <param> ID from hnApi
export async function getItemById(id) {
  const url = `${baseUrl}/item/${id}.json`;
  try {
    return await axios
      .get(url)
      .then(({ data }) => data)
      .catch((err) => err);
  } catch (e) {
    throw e;
  }
}

//USER API
//Get user information from hnApi of for <param> username
export async function getUser(username) {
  const url = `${baseUrl}/user/${username}.json`;
  try {
    return await axios
      .get(url)
      .then(({ data }) => ({ id: data.id, created: data.created }))
      .catch((err) => console.log(err));
  } catch (err) {
    console.error(e.message + ` at getUser() (${__filename})`);
  }
}

//Calculates given <param> user's  "HN Age"
export async function userHnAge(username) {
  console.log("Calculating user age");
  //Fetch user details and destructure created timestamp
  const { created } = await getUser(username);

  //Convert from Unix format to normal
  const joinDate = new Date(created * 1000);
  const joinMonth = joinDate.getMonth();
  const joinYear = joinDate.getFullYear();

  //Get current date for calculation
  const today = new Date();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  //If joinMonth > todayMonth then do this
  return `${
    todayYear - joinYear > 1
      ? todayYear - joinYear + "Years"
      : todayYear - joinYear + "Year"
  } ${
    joinMonth > todayMonth
      ? 12 - (joinMonth - todayMonth)
      : todayMonth - joinMonth
  } months`;

  //Should return 'X years Y months'
}
