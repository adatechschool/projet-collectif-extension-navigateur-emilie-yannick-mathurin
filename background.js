// // background.js

// let timerInterval;

// function startTimer() {
//   console.log("Timer started");
//   timerInterval = setInterval(updateTimer, 1000);
// }

// function updateTimer() {
//   chrome.storage.local.get(["activeTimer", "isRunning"], function (res) {
//     const activeTimer = res.activeTimer || "work";
//     const isRunning = res.isRunning;

//     if (isRunning) {
//       chrome.storage.local.get(
//         [`${activeTimer}Progress`],
//         function (progressRes) {
//           const timerData = progressRes[`${activeTimer}Progress`];

//           if (timerData) {
//             let minutes = timerData.minutes;
//             let seconds = timerData.seconds;

//             console.log(`BACKGROUND ${activeTimer} timer progress:`, {
//               minutes,
//               seconds,
//             });

//             if (minutes === 0 && seconds === 0) {
//               console.log(`Switching to the next timer`);
//               switchTimer(activeTimer);
//             } else {
//               // Decrement seconds and adjust minutes if necessary
//               if (seconds === 0) {
//                 minutes--;
//                 seconds = 59;
//               } else {
//                 seconds--;
//               }

//               chrome.storage.local.set({
//                 [`${activeTimer}Progress`]: { minutes, seconds },
//               });
//             }
//           }
//         }
//       );
//     }
//   });
// }

// function switchTimer(currentTimer) {
//   console.log(`Switching from ${currentTimer} timer to the next timer`);
//   chrome.storage.local.get(["workTimer", "breakTimer"], function (res) {
//     const nextTimer = currentTimer === "work" ? "break" : "work";
//     const nextTimerData = res[`${nextTimer}Timer`];

//     chrome.storage.local.set({
//       activeTimer: nextTimer,
//       [`${nextTimer}Progress`]: nextTimerData,
//     });

//     chrome.storage.local.set({
//       [`${currentTimer}Progress`]: { minutes: 0, seconds: 0 },
//     });
//   });
// }

// startTimer();

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   if (request.command === "start") {
//     startTimer();
//   }
// });

// // No need to stop the timer, it will run indefinitely

//
//
//
//
//
//
//
//
//
//
//
//

// background.js

let timerInterval;

function startTimer() {
  console.log("Timer started");
  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  chrome.storage.local.get(["activeTimer", "isRunning"], function (res) {
    const activeTimer = res.activeTimer || "work";
    const isRunning = res.isRunning;

    if (isRunning) {
      chrome.storage.local.get(
        [`${activeTimer}Progress`],
        function (progressRes) {
          const timerData = progressRes[`${activeTimer}Progress`];

          if (timerData) {
            let minutes = timerData.minutes;
            let seconds = timerData.seconds;

            // console.log(`BACKGROUND ${activeTimer} timer progress:`, {
            //   minutes,
            //   seconds,
            // });

            if (minutes === 0 && seconds === 0) {
              console.log(`Switching to the next timer`);
              switchTimer(activeTimer);
            } else {
              // Decrement seconds and adjust minutes if necessary
              if (seconds === 0) {
                minutes--;
                seconds = 59;
              } else {
                seconds--;
              }

              chrome.storage.local.set({
                [`${activeTimer}Progress`]: { minutes, seconds },
              });
              console.log("BACKGROUND Timer progress", {
                minutes,
                seconds,
              });
            }
          }
        }
      );
    }
  });
}

function switchTimer(currentTimer) {
  console.log(`Switching from ${currentTimer} timer to the next timer`);
  chrome.storage.local.get(["workTimer", "breakTimer"], function (res) {
    const nextTimer = currentTimer === "work" ? "break" : "work";
    const nextTimerData = res[`${nextTimer}Timer`];

    chrome.storage.local.set({
      activeTimer: nextTimer,
      [`${nextTimer}Progress`]: nextTimerData,
    });

    chrome.storage.local.set({
      [`${currentTimer}Progress`]: { minutes: 0, seconds: 0 },
    });
  });
}

startTimer();

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.command === "start") {
    startTimer();
  }
});
