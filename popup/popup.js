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

// function workTimer() {
//   console.log("Inside workTimer function");
//   chrome.storage.local.get(["timer", "workTimer"], (res) => {
//     const time = document.getElementById("time");
//     const minutes = `${res.workTimer - Math.ceil(res.timer / 60)}`.padStart(
//       2,
//       "0"
//     );
//     let seconds = "00";
//     if (res.timer % 60 != 0) {
//       seconds = `${60 - (res.timer % 60)}`.padStart(2, "0");
//     }
//     time.textContent = `${minutes}:${seconds}`;
//     console.log(res.timer, res.workTimer);
//     if (res.timer === res.workTimer * 60) {
//       // console.log(res);
//       // alert("stop");
//       clearInterval(timerInterval);
//       if (!timerBreakInterval) {
//         timerBreakInterval = setInterval(breakTimer, 1000);
//       }
//       breakTimer();
//     }
//   });
// }

// function breakTimer() {
//   console.log("Inside breakTimer function");
//   chrome.storage.local.get(["timer", "breakTimer"], (res) => {
//     const time = document.getElementById("time");
//     const minutes = `${res.breakTimer - Math.ceil(res.timer / 60)}`.padStart(
//       2,
//       "0"
//     );
//     let seconds = "00";
//     if (res.timer % 60 != 0) {
//       seconds = `${60 - (res.timer % 60)}`.padStart(2, "0");
//     }
//     time.textContent = `${minutes}:${seconds}`;

//     if (res.timer === res.breakTimer * 60) {
//       clearInterval(timerBreakInterval);
//       timerInterval = setInterval(workTimer, 1000);
//       workTimer();
//     }
//   });
// }

// workTimer();
// let timerInterval = setInterval(workTimer, 1000);
// let timerBreakInterval = null;
// // const timerBreakInterval = setInterval(breakTimer, 1000);

//
// const startTimerBtn = document.getElementById("start-timer-btn");
// startTimerBtn.addEventListener("click", () => {
//   chrome.storage.local.get(["isRunning"], (res) => {
//     chrome.storage.local.set(
//       {
//         isRunning: !res.isRunning,
//       },
//       () => {
//         startTimerBtn.textContent = !res.isRunning
//           ? "Pause Timer"
//           : "Start Timer";
//       }
//     );
//   });
// });

// const resetTimerBtn = document.getElementById("reset-timer-btn");
// resetTimerBtn.addEventListener("click", () => {
//   chrome.storage.local.set(
//     {
//       timer: 0,
//       isRunning: false,
//     },
//     () => {
//       startTimerBtn.textContent = "Start Timer";
//     }
//   );
// });

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

// Timer functions below

let workChrono;
let minutes;
let seconds = 0;

chrome.storage.local.get(["timer", "workTimer"]).then((res) => {
  minutes = res.workTimer;
  startWorkChrono();
});

function startWorkChrono() {
  if (!workChrono) {
    workChrono = setInterval(updateWorkChrono, 1000);
    console.log("workChrono start");
  }
}

function stopWorkChrono() {
  clearInterval(workChrono);
  workChrono = null;
  updateDisplay();
  console.log("stopWorkChrono stop");
}

function updateWorkChrono() {
  if (minutes === 0 && seconds === 0) {
    stopWorkChrono();
  } else if (seconds === 0) {
    minutes--;
    seconds = 59;
  } else {
    seconds--;
  }
  updateDisplay();
}

function updateDisplay() {
  let formattedMinutes = minutes.toString().padStart(2, "0");
  let formattedSeconds = seconds.toString().padStart(2, "0");
  document.getElementById(
    "work-timer"
  ).textContent = `${formattedMinutes}:${formattedSeconds}`;
}
