# custom-hnapi-endpoints
Custom endpoints for [**Hacker News API**](https://github.com/HackerNews/API)
 
 
## Endpoints 
1. /top-stories — returns the top 10 stories ranked by score in the last 10 minutes. Each story will have the title, url, score, time of submission, and the user who submitted it.
2. /comments/\<storyID\>  — returns the top 10 parent comments on a given story, sorted by the total number of comments (including child comments) per thread. Each comment will have the comment's text, the user’s HN handle, and their HN age. The HN age of a user is basically how old their Hacker News profile is in years.
3. /past-stories — returns all the past top stories that were served previously.


## **Get it up and running**
### Docker Conatainer 
1. Assuming you already have docker, Run **docker-compose up**

### Normal Way (hectic)
1. Run **npm install** or **yarn add \*** to install all the dependencies.
2. Before doing anything please install Redis on your machine using this [Link](https://redis.io/download), as I used Redis as data store to cache the data .
2. After installing is complete if you want to test use **jest** command to test all the test suites.
3. Then just hit the **npm start** or **yarn start** command to get the server up and running.
4. Send a get request using browser or curl on [http://localhost:300/top-stories](http://localhost:300/top-stories), you wil recieve a response with top 10 stories sorted by the highest score.

### **Voila, it works !**
.
.
.
# Code Walk-through  
## /src
#### /src/app.js
Main Express.js app instance

#### /src/server.js
Initialize the server on the given port. (if it doesn't start prefer to make .env or just change the variable value)

#### /src/utilFuncs.js
Contains the small logic functions that are being used in multiple APIs throughout the code.

#### /src/caches.js
Contains a datastore(Redis) which caches the data to save the number of Api calls and flush the data out the cache after some specified time in API but takes a snapshot before flushing.

## /src/routes 
Contains all the route files to the server endpoints and each file is responsible for handling one endpoint.
Default **express router** is being used for routing.

## /src/hnapi
Contains all the files that interact with [**Hacker News API**](https://github.com/HackerNews/API).
#### /hnapi/utilHnApi.js
It handles the fundamental API calls from the Hacker News API. Functions from this file are covered in the test coverage, and they are used as utility functions for other internal APIs.
#### /hnapi/storiesApi.js
Contains the API which is invoked by the middleware function in **/routes/topStories.js**
#### /hnapi/commentsApi.js
Contains the API which is invoked by the middleware function in **/routes/comments.js**

## /src/test
Files responsible for test coverage using jest. To start the test use jest command or to check coverage use jest --coverage command.
