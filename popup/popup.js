let tasks = [];

const addTaskBtn = document.getElementById("add-task-btn");
addTaskBtn.addEventListener("click", () => addTask());

chrome.storage.sync.get(["tasks"], (res) => {
  tasks = res.tasks ? res.tasks : [];
  renderTasks();
});

function saveTasks() {
  chrome.storage.sync.set({
    tasks,
  });
}

function renderTask(taskNum) {
  const taskRow = document.createElement("div");

  const text = document.createElement("input");
  text.type = "text";
  text.placeholder = "Enter a task...";
  text.value = tasks[taskNum];
  text.className = "task-name";
  text.addEventListener("change", () => {
    tasks[taskNum] = text.value;
    saveTasks();
  });

  const deleteBtn = document.createElement("input");
  deleteBtn.type = "button";
  deleteBtn.value = "X";
  deleteBtn.className = "task-delete";
  deleteBtn.addEventListener("click", () => {
    deleteTask(taskNum);
  });

  taskRow.appendChild(text);
  taskRow.appendChild(deleteBtn);

  const taskContainer = document.getElementById("task-container");
  taskContainer.appendChild(taskRow);
}

function addTask() {
  const taskNum = tasks.length;
  tasks.push("");
  renderTask(taskNum);
  saveTasks();
}

function deleteTask(taskNum) {
  tasks.splice(taskNum, 1);
  renderTasks();
  saveTasks();
}

function renderTasks() {
  const taskContainer = document.getElementById("task-container");
  taskContainer.textContent = "";
  tasks.forEach((tasktext, taskNum) => {
    renderTask(taskNum);
  });
}

// Buttons

// const startTimerBtn = document.getElementById("start-timer-btn");
// startTimerBtn.addEventListener("click", () => {
//   console.log("Button clicked");

//   chrome.storage.local.get(["isRunning", "activeTimer"], (res) => {
//     console.log("Storage data retrieved:", res);

//     const isRunning = !res.isRunning;
//     console.log("Updating storage with isRunning:", isRunning);

//     chrome.storage.local.set({ isRunning }, () => {
//       startTimerBtn.textContent = isRunning ? "Pause Timer" : "Start Timer";
//       console.log("Button text updated:", startTimerBtn.textContent);

//       if (isRunning) {
//         // If the timer is starting, check which timer is active and start it
//         const activeTimer = res.activeTimer || "work";
//         console.log("Active Timer:", activeTimer);
//         console.log(
//           "Starting",
//           activeTimer === "work" ? "Work" : "Break",
//           "Chrono"
//         );

//         if (activeTimer === "work") {
//           startWorkChrono();
//         } else {
//           startBreakChrono();
//         }
//       } else {
//         // If the timer is paused, clear the interval
//         console.log("Timer paused. Clearing intervals");
//         clearInterval(workChronoID);
//         clearInterval(breakChronoID);
//       }
//     });
//   });
// });

// const resetTimerBtn = document.getElementById("reset-timer-btn");
// resetTimerBtn.addEventListener("click", () => {
//   chrome.storage.local.set(
//     {
//       isRunning: false,
//       activeTimer: "work", // Set activeTimer to "work" on reset
//     },
//     () => {
//       console.log("Reset button clicked. Storage updated:", {
//         isRunning: false,
//         activeTimer: "work",
//       });

//       startTimerBtn.textContent = "Start Timer";
//     }
//   );
//   resetTimer(); // Call the resetTimer function to reset the timer values
// });

// function resetTimer() {
//   clearInterval(workChronoID);
//   clearInterval(breakChronoID);

//   workMinutes = initWorkChrono;
//   breakMinutes = initBreakChrono;
//   workSeconds = 0;
//   breakSeconds = 0;

//   updateWorkDisplay();
//   updateBreakDisplay();
// }

// // Timer functions below

// let workChronoID;
// let breakChronoID;

// let workMinutes;
// let breakMinutes;

// let workSeconds = 0;
// let breakSeconds = 0;

// let initWorkChrono;
// let initBreakChrono;

// // Get the input given by user to work the worktimer. Async function.
// chrome.storage.local.get(["timer", "workTimer"]).then((res) => {
//   workMinutes = res.workTimer;
//   initWorkChrono = res.workTimer;
//   // startWorkChrono();
// });

// chrome.storage.local.get(["timer", "breakTimer"]).then((res) => {
//   breakMinutes = res.breakTimer;
//   initBreakChrono = res.breakTimer;
// });

// // function startWorkChrono() {
// //   chrome.storage.local.set({ activeTimer: "work" });
// //   workChronoID = setInterval(updateWorkChrono, 1000);
// //   console.log("workChrono start");
// // }

// // function startBreakChrono() {
// //   chrome.storage.local.set({ activeTimer: "break" });
// //   breakChronoID = setInterval(updateBreakChrono, 1000);
// //   console.log("breakChrono start");
// // }

// function startWorkChrono() {
//   chrome.storage.local.set({ activeTimer: "work" });
//   workChronoID = setInterval(() => {
//     updateWorkChrono();
//     updateTimerProgress("work", workMinutes, workSeconds);
//   }, 1000);
//   console.log("workChrono start");
// }

// function startBreakChrono() {
//   chrome.storage.local.set({ activeTimer: "break" });
//   breakChronoID = setInterval(() => {
//     updateBreakChrono();
//     updateTimerProgress("break", breakMinutes, breakSeconds);
//   }, 1000);
//   console.log("breakChrono start");
// }

// function updateTimerProgress(timerType, minutes, seconds) {
//   // Store the progress in chrome.storage.local
//   chrome.storage.local.set({ [`${timerType}Progress`]: { minutes, seconds } });
//   console.log(`Progress for ${timerType} timer stored:`, { minutes, seconds });
// }

// function stopWorkChrono() {
//   clearInterval(workChronoID);
//   updateWorkDisplay();
//   breakMinutes = initBreakChrono;
//   console.log("stopWorkChrono stop");
//   startBreakChrono();
// }

// function stopBreakChrono() {
//   clearInterval(breakChronoID);
//   updateBreakDisplay();
//   console.log("stopWorkChrono stop");
//   // startWorkChrono();
//   workMinutes = initWorkChrono;
//   startWorkChrono();
// }

// function updateWorkChrono() {
//   console.log("updateWorkChrono has started");
//   if (workMinutes === 0 && workSeconds === 0) {
//     stopWorkChrono();
//     clearInterval(workChronoID);
//   } else if (workSeconds === 0) {
//     workMinutes--;
//     workSeconds = 59;
//   } else {
//     workSeconds--;
//   }
//   updateWorkDisplay();
// }

// function updateBreakChrono() {
//   console.log("updateBreakChrono has started");
//   if (breakMinutes === 0 && breakSeconds === 0) {
//     stopBreakChrono();
//     clearInterval(breakChronoID);
//   } else if (breakSeconds === 0) {
//     breakMinutes--;
//     breakSeconds = 59;
//   } else {
//     breakSeconds--;
//   }
//   updateBreakDisplay();
// }

// function updateWorkDisplay() {
//   let formattedMinutes = workMinutes.toString().padStart(2, "0");
//   let formattedSeconds = workSeconds.toString().padStart(2, "0");
//   document.getElementById(
//     "work-timer"
//   ).textContent = `${formattedMinutes}:${formattedSeconds}`;
// }

// function updateBreakDisplay() {
//   let formattedMinutes = breakMinutes.toString().padStart(2, "0");
//   let formattedSeconds = breakSeconds.toString().padStart(2, "0");
//   document.getElementById(
//     "break-timer"
//   ).textContent = `${formattedMinutes}:${formattedSeconds}`;
// }

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
//
//
//

// Interesting code
// function startWorkChrono() {
//   chrome.storage.local
//     .get(["isRunning", "activeTimer", "workProgress", "workTimer"])
//     .then((res) => {
//       const isRunning = res.isRunning;
//       const activeTimer = res.activeTimer || "work";

//       if (!isRunning) {
//         // If no timer is running, get values from workTimer
//         workMinutes = res.workTimer;
//         initWorkChrono = res.workTimer;
//       } else {
//         // If a timer is running, get values from workProgress
//         workMinutes = res.workProgress ? res.workProgress.minutes : 0;
//         workSeconds = res.workProgress ? res.workProgress.seconds : 0;
//       }

//       chrome.storage.local.set({ activeTimer: "work" });
//       workChronoID = setInterval(() => {
//         updateWorkChrono();
//         updateTimerProgress("work", workMinutes, workSeconds);
//       }, 1000);
//       console.log("workChrono start");
//     });
// }

// function startBreakChrono() {
//   chrome.storage.local
//     .get(["isRunning", "activeTimer", "breakProgress", "breakTimer"])
//     .then((res) => {
//       const isRunning = res.isRunning;
//       const activeTimer = res.activeTimer || "break";

//       if (!isRunning) {
//         // If no timer is running, get values from breakTimer
//         breakMinutes = res.breakTimer;
//         initBreakChrono = res.breakTimer;
//       } else {
//         // If a timer is running, get values from breakProgress
//         breakMinutes = res.breakProgress ? res.breakProgress.minutes : 0;
//         breakSeconds = res.breakProgress ? res.breakProgress.seconds : 0;
//       }

//       chrome.storage.local.set({ activeTimer: "break" });
//       breakChronoID = setInterval(() => {
//         updateBreakChrono();
//         updateTimerProgress("break", breakMinutes, breakSeconds);
//       }, 1000);
//       console.log("breakChrono start");
//     });
// }

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

// const startTimerBtn = document.getElementById("start-timer-btn");
// const resetTimerBtn = document.getElementById("reset-timer-btn");

// let workChronoID;
// let breakChronoID;

// let workMinutes;
// let breakMinutes;

// let workSeconds = 0;
// let breakSeconds = 0;

// let initWorkChrono;
// let initBreakChrono;

// function updateWorkChrono() {
//   console.log("updateWorkChrono has started");
//   if (workMinutes === 0 && workSeconds === 0) {
//     stopWorkChrono();
//     clearInterval(workChronoID);
//   } else if (workSeconds === 0) {
//     workMinutes--;
//     workSeconds = 59;
//   } else {
//     workSeconds--;
//   }
//   updateWorkDisplay();
// }

// function updateBreakChrono() {
//   console.log("updateBreakChrono has started");
//   if (breakMinutes === 0 && breakSeconds === 0) {
//     stopBreakChrono();
//     clearInterval(breakChronoID);
//   } else if (breakSeconds === 0) {
//     breakMinutes--;
//     breakSeconds = 59;
//   } else {
//     breakSeconds--;
//   }
//   updateBreakDisplay();
// }

// // Get the input given by user to work the worktimer. Async function.
// chrome.storage.local
//   .get([
//     "isRunning",
//     "activeTimer",
//     "workProgress",
//     "breakProgress",
//     "workTimer",
//     "breakTimer",
//   ])
//   .then((res) => {
//     workMinutes = res.workTimer;
//     initWorkChrono = res.workTimer;

//     breakMinutes = res.breakTimer;
//     initBreakChrono = res.breakTimer;
//   });

// function startWorkChrono() {
//   chrome.storage.local.set({ activeTimer: "work" });
//   workChronoID = setInterval(() => {
//     updateWorkChrono();
//     updateTimerProgress("work", workMinutes, workSeconds);
//   }, 1000);
//   console.log("workChrono start");
// }

// function startBreakChrono() {
//   chrome.storage.local.set({ activeTimer: "break" });
//   breakChronoID = setInterval(() => {
//     updateBreakChrono();
//     updateTimerProgress("break", breakMinutes, breakSeconds);
//   }, 1000);
//   console.log("breakChrono start");
// }

// function stopWorkChrono() {
//   clearInterval(workChronoID);
//   updateWorkDisplay();
//   breakMinutes = initBreakChrono;
//   console.log("stopWorkChrono stop");
//   startBreakChrono();
// }

// function stopBreakChrono() {
//   clearInterval(breakChronoID);
//   updateBreakDisplay();
//   console.log("stopWorkChrono stop");
//   // startWorkChrono();
//   workMinutes = initWorkChrono;
//   startWorkChrono();
// }

// function updateTimerProgress(timerType, minutes, seconds) {
//   // Store the progress in chrome.storage.local
//   chrome.storage.local.set({ [`${timerType}Progress`]: { minutes, seconds } });
//   console.log(`Progress for ${timerType} timer stored:`, { minutes, seconds });
// }

// function updateWorkDisplay() {
//   let formattedMinutes = workMinutes.toString().padStart(2, "0");
//   let formattedSeconds = workSeconds.toString().padStart(2, "0");
//   document.getElementById(
//     "work-timer"
//   ).textContent = `${formattedMinutes}:${formattedSeconds}`;
// }

// function updateBreakDisplay() {
//   let formattedMinutes = breakMinutes.toString().padStart(2, "0");
//   let formattedSeconds = breakSeconds.toString().padStart(2, "0");
//   document.getElementById(
//     "break-timer"
//   ).textContent = `${formattedMinutes}:${formattedSeconds}`;
// }

// startTimerBtn.addEventListener("click", () => {
//   console.log("Button clicked");

//   chrome.storage.local.get(["isRunning"], (res) => {
//     console.log("Storage data retrieved:", res);

//     const isRunning = !res.isRunning;
//     console.log("Updating storage with isRunning:", isRunning);

//     chrome.storage.local.set({ isRunning }, () => {
//       startTimerBtn.textContent = isRunning ? "Pause Timer" : "Start Timer";
//       console.log("Button text updated:", startTimerBtn.textContent);

//       if (isRunning) {
//         // If the timer is starting, check which timer is active and start it
//         chrome.storage.local.get(["activeTimer"], (res) => {
//           const activeTimer = res.activeTimer || "work";
//           console.log("Active Timer:", activeTimer);
//           console.log(
//             "Starting",
//             activeTimer === "work" ? "Work" : "Break",
//             "Chrono"
//           );

//           if (activeTimer === "work") {
//             startWorkChrono();
//           } else {
//             startBreakChrono();
//           }
//         });
//       } else {
//         // If the timer is paused, clear the interval
//         console.log("Timer paused. Clearing intervals");
//         clearInterval(workChronoID);
//         clearInterval(breakChronoID);
//       }
//     });
//   });
// });

// resetTimerBtn.addEventListener("click", () => {
//   chrome.storage.local.set(
//     {
//       isRunning: false,
//       activeTimer: "work", // Set activeTimer to "work" on reset
//     },
//     () => {
//       console.log("Reset button clicked. Storage updated:", {
//         isRunning: false,
//         activeTimer: "work",
//       });

//       startTimerBtn.textContent = "Start Timer";
//     }
//   );
//   resetTimer(); // Call the resetTimer function to reset the timer values
// });

// function resetTimer() {
//   clearInterval(workChronoID);
//   clearInterval(breakChronoID);

//   // Reset timer values based on active timer
//   chrome.storage.local.get(
//     ["activeTimer", "workTimer", "breakTimer"],
//     (res) => {
//       const activeTimer = res.activeTimer || "work";

//       if (activeTimer === "work") {
//         workMinutes = res.workTimer || 0;
//         initWorkChrono = res.workTimer || 0;
//       } else {
//         breakMinutes = res.breakTimer || 0;
//         initBreakChrono = res.breakTimer || 0;
//       }

//       workSeconds = 0;
//       breakSeconds = 0;

//       updateWorkDisplay();
//       updateBreakDisplay();
//     }
//   );
// }

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

let workChronoID;
let breakChronoID;

let workMinutes;
let breakMinutes;

let workSeconds = 0;
let breakSeconds = 0;

let initWorkChrono;
let initBreakChrono;

let workMinutesProgress;
let workSecondsProgress;

let breakMinutesProgress;
let breakSecondsProgress;

console.log("work", workMinutesProgress, workSecondsProgress);
console.log("break", breakMinutesProgress, breakSecondsProgress);

// Get the input given by user to work the worktimer. Async function.
// chrome.storage.local.get(["timer", "workTimer"]).then((res) => {
//   workMinutes = res.workTimer;
//   initWorkChrono = res.workTimer;
//   // startWorkChrono();
// });

// chrome.storage.local.get(["timer", "breakTimer"]).then((res) => {
//   breakMinutes = res.breakTimer;
//   initBreakChrono = res.breakTimer;
// });

// chrome.storage.local.get(["workProgress", "breakProgress"]).then((res) => {
//   workMinutesProgress = res.workProgress.minutes;
//   workSecondsProgress = res.workProgress.seconds;

//   breakMinutesProgress = res.breakProgress.minutes;
//   breakSecondsProgress = res.breakProgress.seconds;
//   console.log("work", workMinutesProgress, workSecondsProgress);
//   console.log("break", breakMinutesProgress, breakSecondsProgress);
// });

chrome.storage.local
  .get(["timer", "workTimer", "breakTimer", "workProgress", "breakProgress"])
  .then((res) => {
    workMinutes = res.workTimer;
    initWorkChrono = res.workTimer;

    breakMinutes = res.breakTimer;
    initBreakChrono = res.breakTimer;

    workMinutesProgress = res.workProgress.minutes;
    workSecondsProgress = res.workProgress.seconds;

    breakMinutesProgress = res.breakProgress.minutes;
    breakSecondsProgress = res.breakProgress.seconds;

    console.log("work", workMinutesProgress, workSecondsProgress);
    console.log("break", breakMinutesProgress, breakSecondsProgress);

    initPopup();
    console.log("initPopup has started");
  });

const startTimerBtn = document.getElementById("start-timer-btn");
startTimerBtn.addEventListener("click", () => {
  console.log("Button clicked");

  chrome.storage.local.get(["isRunning", "activeTimer"], (res) => {
    console.log("Storage data retrieved:", res);

    const isRunning = !res.isRunning;
    console.log("Updating storage with isRunning:", isRunning);

    chrome.storage.local.set({ isRunning }, () => {
      startTimerBtn.textContent = isRunning ? "Pause Timer" : "Start Timer";
      console.log("Button text updated:", startTimerBtn.textContent);

      if (isRunning) {
        // If the timer is starting, check which timer is active and start it
        const activeTimer = res.activeTimer || "work";
        console.log("Active Timer:", activeTimer);
        console.log(
          "Starting",
          activeTimer === "work" ? "Work" : "Break",
          "Chrono"
        );

        if (activeTimer === "work") {
          startWorkChrono();
          console.log("Starting Work Chrono in startTimerBtn");
        } else {
          startBreakChrono();
          console.log("Starting Break Chrono in startTimerBtn");
        }
      } else {
        // If the timer is paused, clear the interval
        console.log("Timer paused. Clearing intervals");
        clearInterval(workChronoID);
        clearInterval(breakChronoID);
      }
    });
  });
});

const resetTimerBtn = document.getElementById("reset-timer-btn");
resetTimerBtn.addEventListener("click", () => {
  chrome.storage.local.set(
    {
      isRunning: false,
      activeTimer: "work", // Set activeTimer to "work" on reset
    },
    () => {
      console.log("Reset button clicked. Storage updated:", {
        isRunning: false,
        activeTimer: "work",
      });

      startTimerBtn.textContent = "Start Timer";
    }
  );
  resetTimer(); // Call the resetTimer function to reset the timer values
});

function resetTimer() {
  clearInterval(workChronoID);
  clearInterval(breakChronoID);

  workMinutes = initWorkChrono;
  breakMinutes = initBreakChrono;
  workSeconds = 0;
  breakSeconds = 0;

  workMinutesProgress = initWorkChrono;
  workSecondsProgress = 0;
  breakMinutesProgress = initBreakChrono;
  breakSecondsProgress = 0;

  updateWorkDisplay();
  updateBreakDisplay();
}

// Timer functions below

function initPopup() {
  // Check which timer is active
  const activeTimer = chrome.storage.local.get("activeTimer", (result) => {
    if (result.activeTimer === "work") {
      // Check if there are values for work timer progress
      if (
        typeof workMinutesProgress === "number" &&
        typeof workSecondsProgress === "number"
      ) {
        startWorkChrono();
        console.log("Starting Work Chrono from initPopup()");
      } else {
        // If no values are found, reset the work timer
        resetTimer();
      }
    } else if (result.activeTimer === "break") {
      // Check if there are values for break timer progress
      if (
        typeof breakMinutesProgress === "number" &&
        typeof breakSecondsProgress === "number"
      ) {
        startBreakChrono();
        console.log("Starting Break Chrono from initPopup()");
      } else {
        // If no values are found, reset the break timer
        resetTimer();
      }
    }
  });
}

function startWorkChrono() {
  chrome.storage.local.set({ activeTimer: "work" });
  workChronoID = setInterval(() => {
    updateWorkChrono();
    updateTimerProgress("work", workMinutes, workSeconds);
  }, 1000);
  console.log("workChrono start");
}

function startBreakChrono() {
  chrome.storage.local.set({ activeTimer: "break" });
  breakChronoID = setInterval(() => {
    updateBreakChrono();
    updateTimerProgress("break", breakMinutes, breakSeconds);
  }, 1000);
  console.log("breakChrono start");
}

function updateTimerProgress(timerType, minutes, seconds) {
  // Store the progress in chrome.storage.local
  chrome.storage.local.set({ [`${timerType}Progress`]: { minutes, seconds } });
  console.log(`Progress for ${timerType} timer stored:`, { minutes, seconds });
}

function stopWorkChrono() {
  clearInterval(workChronoID);
  updateWorkDisplay();
  breakMinutes = initBreakChrono;
  console.log("stopWorkChrono stop");
  startBreakChrono();
}

function stopBreakChrono() {
  clearInterval(breakChronoID);
  updateBreakDisplay();
  console.log("stopWorkChrono stop");
  // startWorkChrono();
  workMinutes = initWorkChrono;
  startWorkChrono();
}

function updateWorkChrono() {
  console.log("updateWorkChrono has started");
  if (workMinutes === 0 && workSeconds === 0) {
    stopWorkChrono();
    clearInterval(workChronoID);
  } else if (workSeconds === 0) {
    workMinutes--;
    workSeconds = 59;
  } else {
    workSeconds--;
  }
  updateWorkDisplay();
}

function updateBreakChrono() {
  console.log("updateBreakChrono has started");
  if (breakMinutes === 0 && breakSeconds === 0) {
    stopBreakChrono();
    clearInterval(breakChronoID);
  } else if (breakSeconds === 0) {
    breakMinutes--;
    breakSeconds = 59;
  } else {
    breakSeconds--;
  }
  updateBreakDisplay();
}

function updateWorkDisplay() {
  console.log("inside updateWorkDisplay");
  let formattedMinutes = workMinutes.toString().padStart(2, "0");
  let formattedSeconds = workSeconds.toString().padStart(2, "0");
  document.getElementById(
    "work-timer"
  ).textContent = `${formattedMinutes}:${formattedSeconds}`;
}

function updateBreakDisplay() {
  let formattedMinutes = breakMinutes.toString().padStart(2, "0");
  let formattedSeconds = breakSeconds.toString().padStart(2, "0");
  document.getElementById(
    "break-timer"
  ).textContent = `${formattedMinutes}:${formattedSeconds}`;
}
