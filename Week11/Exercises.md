### Q1. Explain using code examples what is meant by props and state in React JS?
Props are a way to pass data from parents to child components. They are read only and used to render dynamic data.
function ParentComponent() {
  const message = "Message from parent shown in ChildComponent";
  return <ChildComponent greeting={message} />;
}

function ChildComponent(props) {
  return <h1>{props.greeting}</h1>;
}

State is how you manage a data within a component. It is local to the component, is mutable and typically used for keeping track of user input. 

function Counter() {
  const [count, setCount] = useState(0);
    const increment = () => {
    setCount(count + 1); 
  };

    return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={increment}>Click me</button>
    </div>
  );
}


### Q2. In functional programming, what does the term functor mean? Can you give an example in JavaScript?
A functor is a data structure that implements map method. Map then takes in a function as an argument and applies the function to each val in the data structure.
const numbers = [1, 2, 3, 4, 5];

const squaredNumbers = numbers.map(num => num * num);

console.log(squaredNumbers); // Output: [1, 4, 9, 16, 25]

### Q3. We have looked at three kinds of asynchronous programming mechanisms, namely callbacks, promises and streams. Mention one advantage and one disadvantage of each type.
Callbacks:
Advantage -> Straightforward, good for scenarios that arent complex. Clear way to specify what should happen after an async operation completes.
Disadvantage -> Error handeling can be challenging when delaing with nested callbacks.

Promises:
Advantage -> Avoid the nesting issues from callbacks. Better built in error handeling using .catch.
Disadvantage -> Can get complex when async operations are waiting on the results of a previous operation.

Streams:
Advantage -> Good for large ammounts of data, ideal for network communication where data is broken down into smaller chunks.
Disadvantage -> Potential memory leaks if proper flow control is not implemetned.


### Q4. With the aid of a diagram and example code, describe the Cascading Style Sheets (CSS) Box Model and show how it can be used to space DOM elements
Box Model describes how each lement in the dom is rendered as a box. Each box has 4 components, content, padding, border, margin. Can be used to space DOM elements by using the margin to seperate the DOM element from other elemtns by adding space around it. 

+----------------------------+
|          Margin            |
|  +----------------------+  |
|  |       Border        |  |
|  |  +--------------+   |  |
|  |  |   Padding    |   |  |
|  |  |  +--------+  |   |  |
|  |  |  | Content |  |   |  |
|  |  |  +--------+  |   |  |
|  |  +--------------+   |  |
|  +----------------------+  |
+----------------------------+

.box {
  width: 200px;
  padding: 20px; 
  border: 5px solid blue; 
  margin: 30px; 
  background-color: lightgray;
}

### Q5. Detail how the browser loads and bootstraps a rich web application from an initial URL.
1. Request the URL - User inputs a url to the browser and the browser makes a HTTP request to the server for the URL
2. Server response - Server returns the html file
3. Loading resources - Broswer parses the HTML
4. JS execution and API calls - JS code is executed and initializes the web app framework. API calls made to fetch data.
5. Website now rendered to the user and they can now interact.
6. UI is regularly updated with user intercation and data changes.

User Request (URL) 
       |
       v
Server Response (HTML + Links to JS and CSS)
       |
       v
Browser Loads Resources (JS executed, CSS applied)
       |
       v
Application Initialization and API Calls
       |
       v
DOM Manipulation and Initial Render
       |
       v
Application Ready (User Interactions, Client-Side Routing, Lazy Loading)
