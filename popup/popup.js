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
        } else {
          startBreakChrono();
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

  updateWorkDisplay();
  updateBreakDisplay();
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
  // startWorkChrono();
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
  chrome.storage.local.set({ activeTimer: "work" });
  workChronoID = setInterval(updateWorkChrono, 1000);
  console.log("workChrono start");
}

function startBreakChrono() {
  chrome.storage.local.set({ activeTimer: "break" });
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
