let tasks = [];

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

let workChronoID;
let breakChronoID;

let workMinutes;
let breakMinutes;

let workSeconds = 0;
let breakSeconds = 0;

let initWorkChrono;
let initBreakChrono;

// Get the input given by user to work the worktimer. Async function.
chrome.storage.local.get(["timer", "workTimer"]).then((res) => {
  workMinutes = res.workTimer;
  initWorkChrono = res.workTimer;
  startWorkChrono();
});

chrome.storage.local.get(["timer", "breakTimer"]).then((res) => {
  breakMinutes = res.breakTimer;
  initBreakChrono = res.breakTimer;
});

function initChrono() {
  console.log("inside initChrono !!!!");
  startWorkChrono();
}

function startWorkChrono() {
  workChronoID = setInterval(updateWorkChrono, 1000);
  console.log("workChrono start");
}

function startBreakChrono() {
  breakChronoID = setInterval(updateBreakChrono, 1000);
  console.log("breakChrono start");
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
  initChrono();
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
