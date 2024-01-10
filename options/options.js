const workTimeOption = document.getElementById("work-option");
workTimeOption.addEventListener("change", (event) => {
  const val = event.target.value;
  if (val < 1 || val > 60) {
    workTimeOption.value = 25;
  }
});

const breakTimeOption = document.getElementById("break-option");
breakTimeOption.addEventListener("change", (event) => {
  const val = event.target.value;
  if (val < 1 || val > 60) {
    breakTimeOption.value = 5;
  }
});

const workSaveBtn = document.getElementById("work-save-btn");
workSaveBtn.addEventListener("click", () => {
  chrome.storage.local.set({
    timer: 0,
    workTimer: workTimeOption.value,
    isRunning: false,
  });
});

const breakSaveBtn = document.getElementById("break-save-btn");
breakSaveBtn.addEventListener("click", () => {
  chrome.storage.local.set({
    timer: 0,
    breakTimer: breakTimeOption.value,
    isRunning: false,
  });
});

chrome.storage.local.get(["workTimer"], (res) => {
  workTimeOption.value = res.workTimer;
  console.log("Initial workTimer: ", res.workTimer);
});

chrome.storage.local.get(["breakTimer"], (res) => {
  breakTimeOption.value = res.breakTimer;
  console.log("Initial breakTimer: ", res.breakTimer);
});
