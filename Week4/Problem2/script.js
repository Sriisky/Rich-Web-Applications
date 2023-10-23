//define URL
const apiUrl = "http://jsonplaceholder.typicode.com/posts";

//Task 1: List all of the post titles having more than six words
//fetching the data from the API
 fetch(apiUrl) //send GET request to apiUrl
  .then((response) => response.json()) //parse response to json
  //filter posts
  .then((data) => {
  
    const result = data
      .filter((post) => post.title.split(" ").length > 6) //filter posts so we only have titles over 6 words in length
      .map((post) => post.title); //extract the titles of the filtered posts

    //display the titles
    console.log(result);
  }) 


//Task 2: Show a word frequency map for all of the body contents of the posts
fetch(apiUrl) //send GET request to apiUrl
.then((response) => response.json()) //parse response to JSON

.then((data) => {
  //extract the body contents of all posts
  const totalBodyContent = data.map((post) => post.body); //create an array to hold the body of the posts

  //combine all post bodies into a single string so its easier to analyze
  const combinedBodyContent = totalBodyContent.join(' ');

  //split the combined string into words and count their frequencies
  const wordFreq = combinedBodyContent
    .toLowerCase() //convert to lowercase to ensure case-insensitive counts
    .split(/\s+/) //split by whitespace to get words
    .filter((word) => word.length > 0) //filter out empty strings
    //reduces the array of words into a word frequency map (an object where keys are words and values are their respective frequencies)
    .reduce((frequencyMap, word) => {
      //each word is a key
      frequencyMap[word] = (frequencyMap[word] || 0) + 1; //increment count for each word
      return frequencyMap;
    }, {});

  console.log('Word Frequency Map for Post Bodies:');
  console.log(wordFreq);
})