### Q1. Explain what is meant by the stream abstraction. What is the relationship between streams and the observer pattern? What are streams useful for modeling and when might you use them in Rich Web development?

Stream abstraction - Represents a series of asynchronous data or events over a period of time. This model operates by sequentially emitting data or events and allows consumers to react to each item as it arrives. Streams are capable of managing different types of data, such as basic values, messages, or entire objects, and can release these data points either synchronously or asynchronously. Reactive programming uses streams as a sequence of ongoing events ordered in time that offer some hooks with which to observe and manipulate the emitted data.

Relationship between streams and the observer pattern - The Observer pattern consists of two entities: subjects and observers. The subject is responsible for keeping track of a list of observers and informing them of any changes in its state. This is typically done by invoking one of the observer's methods. This particular design pattern is fundamental for event handling. The stream can be regarded as its own subject.
The individuals who subscribe to the stream behave in a manner akin to that of observers. Every time the stream generates a new value, it proceeds to inform all individuals subscribed to it by invoking the designated callback function provided by each subscriber. Streams are frequently accompanied by an extensive collection of operators that enable the filtering, conversion, merging, and overall manipulation of the data as it progresses through the stream.

Streams used in modeling - Useful for modeling data flows. e.g. User inputs like clicks and key presses.

Usage in rich web development - Real-time analytic dashboards, live streams, complex user interfaces.

### Q2. Assume that you are building an interface to an API in your Rich Web App. Describe in detail how you could use the RxJS library to handle asynchronous network responses to API requests. In your opinion, what are the benefits to using a streams library for networking over, say, promises? And what do you think are the downsides?

Using RXJS to handle async network responses - RxJS allows you to convert promises, such as those returned by the fetch API or other promise-based HTTP libraries, into observables using from or fromFetch. You can then use RxJS operators to compose and manipulate the streams of data e.g. you can use map, filter, and mergeMap to transform the data stream. Once you have defined how the observable should behave, you can subscribe to it and handle the data when it arrives and manage errors. It is also possible to unsubscribe from the observable to prevent memory leaks or unnecessary network requests.

Benefits to using a streams library for networking over promises - Streams can emit multiple values over time. Promises are one-time operations. Promises dont support cancellation. Streams allow subscribers to unsubscribe which can cancel ongoing asynch tasks if result is no longer needed. 

Disadvantages to using a streams library for networking over promises - Streams are complex and have a steep learning curve. Debugging can be a challenge due to their aync nature.

### Q3. Consider three asynchronous tasks, A,B & C. What are the consequences of these functions sharing global state? What is a good practice to alleviate any problems associated with this?

Consequences of sharing a global state - If two or more tasks attempt to read and write to the same global state simultaneously, you can end up with race conditions where the outcome depends on the sequence or timing of the tasks' execution, leading to unpredictable behaviours. Understanding the flow of data and how it's being mutated becomes complex when state changes are scattered across various asynchronous tasks.

Best practice for avoiding problems associated - Treat global state as immutable. Instead of modifying the global state directly, create new copies of the state with the necessary changes applied. Use locks or semaphores to control access to shared resources.