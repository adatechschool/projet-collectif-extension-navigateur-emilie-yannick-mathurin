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
    workTimeOption: workTimeOption.value,
  });
});

const breakSaveBtn = document.getElementById("break-save-btn");
breakSaveBtn.addEventListener("click", () => {
  chrome.storage.local.set({
    breakTimeOption: breakTimeOption.value,
  });
});

chrome.storage.local.get(["workTimer", "breakTimer"], (res) => {
  workTimeOption.value = res.workTimer;
  breakTimeOption.value = res.breakTimer;
});
