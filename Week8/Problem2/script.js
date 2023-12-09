// wait for dom to load first
document.addEventListener('DOMContentLoaded', () => {
    const { interval, Subject } = rxjs;
    const { takeWhile, tap } = rxjs.operators;

  // to emit values when minutes and hours need to decrement
  const minuteSubject = new Subject();
  const hourSubject = new Subject();

  // get input elements
  const hourInput = document.getElementById('hour');
  const minInput = document.getElementById('minute');
  const secondInput = document.getElementById('second');
  const timer = document.getElementById('timer');

  // update values displayed in the input boxes
  function updateTimer(hours, minutes, seconds) {
    //padStart adds a 0 to the beginning of the number to ensure input is always 2 digits
    hourInput.value = String(hours).padStart(2, '0');
    minInput.value = String(minutes).padStart(2, '0');
    secondInput.value = String(seconds).padStart(2, '0');

    // timer div should show what user inputted
    timer.textContent = `${hourInput.value}:${minInput.value}:${secondInput.value}`;
  }

  // start countdown
  function startCountdown() {
    // observable that emits a value every second
    const secondsInterval$ = interval(1000).pipe(
    // tap performs side effects with each emitted value
      tap(() => {
        // if there is more than 0 seconds left, decrement seconds
        if (secondInput.value > 0) {
          secondInput.value--;
        } 
        // if seconds is 0 and there is still hours or minutes left
        else {
          if (minInput.value > 0 || hourInput.value > 0) {
            // set seconds to 59 and notify minuteSubject
            secondInput.value = 59;
            minuteSubject.next(); // decrement minutes
          }
        }
        // update display
        updateTimer(hourInput.value, minInput.value, secondInput.value);
      }),

      // takeWhile emits values until condition is false
      takeWhile(() => hourInput.value > 0 || minInput.value > 0 || secondInput.value > 0)
    );

    // subscribe to the minuteSubject to decrement minutes
    const minutesSubscription = minuteSubject.subscribe(() => {
      // if more than 0 minutes, decrement value
      if (minInput.value > 0) {
        minInput.value--;
      } 
      // if minutes is 0
      else {
        //if there are hours left reset minutes and decrement hours
        if (hourInput.value > 0) {
          minInput.value = 59;
          hourSubject.next(); // decrement hourSubject
        }
      }
    });

    // subscribe to hourSubject to decrement hours
    const hoursSubscription = hourSubject.subscribe(() => {
      // if more than 0 hours left, decrement hours
      if (hourInput.value > 0) {
        hourInput.value--;
      }
    });

    // subscribe to seconds interval obserable to start countdown
    const secondsSubscription = secondsInterval$.subscribe();

    // clean all subscriptions at the same time
    // when the secondsSubscription is completed or unsubscribed, unsubscribe from these subscriptions at same time
    secondsSubscription.add(minutesSubscription);
    secondsSubscription.add(hoursSubscription);
  }

  // attach startCountdown to the button
  const startButton = document.getElementById('startButton');
  const startButtonClick$ = rxjs.fromEvent(startButton, 'click'); // observable of button's clicks
  startButtonClick$.subscribe(startCountdown); // call startCountdown when clicked
});