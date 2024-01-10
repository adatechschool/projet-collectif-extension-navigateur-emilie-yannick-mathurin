let tasks = [];

// function updateTime() {
//   console.log("Inside updateTime function");
//   chrome.storage.local.get(["timer", "workTimeOption"], (res) => {
//     const time = document.getElementById("time");
//     const minutes = `${
//       res.workTimeOption - Math.ceil(res.timer / 60)
//     }`.padStart(2, "0");
//     let seconds = "00";
//     if (res.timer % 60 != 0) {
//       seconds = `${60 - (res.timer % 60)}`.padStart(2, "0");
//     }
//     time.textContent = `${minutes}:${seconds}`;
//   });
// }

// updateTime();
// setInterval(updateTime, 1000);

function workTimer() {
  console.log("Inside workTimer function");
  chrome.storage.local.get(["timer", "workTimeOption"], (res) => {
    const time = document.getElementById("time");
    const minutes = `${
      res.workTimeOption - Math.ceil(res.timer / 60)
    }`.padStart(2, "0");
    let seconds = "00";
    if (res.timer % 60 != 0) {
      seconds = `${60 - (res.timer % 60)}`.padStart(2, "0");
    }
    time.textContent = `${minutes}:${seconds}`;
    console.log(res.timer, res.workTimeOption);
    if (res.timer === res.workTimeOption * 60) {
      // console.log(res);
      // alert("stop");
      clearInterval(timerInterval);
      if (!timerBreakInterval) {
        timerBreakInterval = setInterval(breakTimer, 1000);
      }
      breakTimer();
    }
  });
}

function breakTimer() {
  console.log("Inside breakTimer function");
  chrome.storage.local.get(["timer", "breakTimeOption"], (res) => {
    const time = document.getElementById("time");
    const minutes = `${
      res.breakTimeOption - Math.ceil(res.timer / 60)
    }`.padStart(2, "0");
    let seconds = "00";
    if (res.timer % 60 != 0) {
      seconds = `${60 - (res.timer % 60)}`.padStart(2, "0");
    }
    time.textContent = `${minutes}:${seconds}`;

    if (res.timer === res.breakTimeOption * 60) {
      clearInterval(timerBreakInterval);
      timerInterval = setInterval(workTimer, 1000);
      workTimer();
    }
  });
}

workTimer();
let timerInterval = setInterval(workTimer, 1000);
let timerBreakInterval = null;
// const timerBreakInterval = setInterval(breakTimer, 1000);

const startTimerBtn = document.getElementById("start-timer-btn");
startTimerBtn.addEventListener("click", () => {
  chrome.storage.local.get(["isRunning"], (res) => {
    chrome.storage.local.set(
      {
        isRunning: !res.isRunning,
      },
      () => {
        startTimerBtn.textContent = !res.isRunning
          ? "Pause Timer"
          : "Start Timer";
      }
    );
  });
});

const resetTimerBtn = document.getElementById("reset-timer-btn");
resetTimerBtn.addEventListener("click", () => {
  chrome.storage.local.set(
    {
      timer: 0,
      isRunning: false,
    },
    () => {
      startTimerBtn.textContent = "Start Timer";
    }
  );
});

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

// // Define constants for the DOM elements representing the timers
// const workTimerEl = document.getElementById("work-timer");
// const breakTimerEl = document.getElementById("break-timer");

// // Function to convert a duration in minutes to seconds
// function minutesToSeconds(minutes) {
//   return minutes * 60;
// }

// // Initialize variables to keep track of the remaining durations of the work and break timers
// let workDuration = 0;
// let breakDuration = 0;

// // Load the work and break times from Chrome storage
// chrome.storage.local.get(
//   ["workTime", "breakTime"],
//   ({ workTime, breakTime }) => {
//     // Convert the work and break times to seconds
//     workDuration = minutesToSeconds(workTime);
//     breakDuration = minutesToSeconds(breakTime);

//     // Start the work timer
//     updateTimers();
//   }
// );

// // Function to update the displayed timers
// function updateTimers() {
//   // Check which timer is currently running
//   if (workDuration > 0) {
//     // Work timer is running
//     workTimerEl.textContent = formatTimeString(workDuration);
//     workDuration--;
//   } else if (breakDuration > 0) {
//     // Break timer is running
//     breakTimerEl.textContent = formatTimeString(breakDuration);
//     breakDuration--;
//   } else {
//     // Both timers have completed
//     console.log("All timers have completed.");
//     clearInterval(updateTimerIntervalId);
//     return;
//   }

//   // Schedule the next update
//   setTimeout(() => {
//     updateTimers();
//   }, 1000);
// }

// // Interval ID for updating the timers
// let updateTimerIntervalId = null;

// // Set up the interval for updating the timers
// updateTimerIntervalId = setInterval(() => {
//   updateTimers();
// }, 1000);

// // Utility function to format a duration in seconds as a string in MM:SS format
// function formatTimeString(seconds) {
//   const minutes = Math.floor(seconds / 60);
//   const secondsLeft = seconds % 60;
//   return `${minutes}:${
//     secondsLeft < 10 ? "0" + String(secondsLeft) : String(secondsLeft)
//   }`;
// }
