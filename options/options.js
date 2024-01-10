// const workTimeOption = document.getElementById("work-option");
// workTimeOption.addEventListener("change", (event) => {
//   const val = event.target.value;
//   if (val < 1 || val > 60) {
//     workTimeOption.value = 25;
//   }
// });

// const breakTimeOption = document.getElementById("break-option");
// breakTimeOption.addEventListener("change", (event) => {
//   const val = event.target.value;
//   if (val < 1 || val > 60) {
//     breakTimeOption.value = 5;
//   }
// });

// const workSaveBtn = document.getElementById("work-save-btn");
// workSaveBtn.addEventListener("click", () => {
//   chrome.storage.local.set({
//     workTimeOption: workTimeOption.value,
//   });
// });

// const breakFormSaveBtn = document.getElementById("break-save-btn");
// breakFormSaveBtn.addEventListener("click", () => {
//   chrome.storage.local.set({
//     breakTimeOption: breakTimeOption.value,
//   });
// });

// chrome.storage.local.get(["workTimer", "breakTimer"], (res) => {
//   workTimeOption.value = res.workTimer || "default_work_time"; // set default value if not present
//   breakTimeOption.value = res.breakTimer || "default_break_time"; // set default value if not present

//   console.log("Work Time Option Value:", res.workTimer);
//   console.log("Break Time Option Value:", res.breakTimer);
// });

// const workSaveBtn = document.getElementById("work-save-btn");
// workSaveBtn.addEventListener("click", () => {
//   chrome.storage.local.set({
//     workTimeOption: workTimeOption.value,
//   });
// });

// const breakSaveBtn = document.getElementById("break-save-btn");
// breakSaveBtn.addEventListener("click", () => {
//   chrome.storage.local.set({
//     breakTimeOption: breakTimeOption.value,
//   });
// });

// chrome.storage.local.get(["workTimer", "breakTimer"], (res) => {
//   workTimeOption.value = res.workTimer;
//   breakTimeOption.value = res.breakTimer;
// });

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
//
//
//

// // Get references to the input elements
// const workTimeOption = document.getElementById("work-input");
// const breakTimeOption = document.getElementById("break-input");

// // Update the storage when the values of the input elements change
// workTimeOption.addEventListener("input", () => {
//   // Save the value of the 'work-input' element to local storage
//   chrome.storage.local.set({ workTime: parseInt(workTimeOption.value) }, () => {
//     console.log(`Saved work time: ${workTimeOption.value}`);
//   });
// });

// breakTimeOption.addEventListener("input", () => {
//   // Save the value of the 'break-input' element to local storage
//   chrome.storage.local.set(
//     { breakTime: parseInt(breakTimeOption.value) },
//     () => {
//       console.log(`Saved break time: ${breakTimeOption.value}`);
//     }
//   );
// });

// function displaySavedValues() {
//   chrome.storage.local.get(
//     ["timer", "workTimeOption", "breakTimeOption", "isRunning"],
//     (result) => {
//       console.log("Stored Values: ", result);
//     }
//   );
// }

// // Initialize the saved values at startup
// displaySavedValues();

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

const workTimeOption = document.getElementById("work-input");
const breakTimeOption = document.getElementById("break-input");

workTimeOption.addEventListener("input", () => {
  // Save the value of the 'work-input' element to local storage
  chrome.storage.local.set(
    { workTime: parseFloat(workTimeOption.value) || 0 },
    () => {
      console.log(`Saved work time: ${workTimeOption.value}`);
    }
  );
});

breakTimeOption.addEventListener("input", () => {
  // Save the value of the 'break-input' element to local storage
  chrome.storage.local.set(
    { breakTime: parseFloat(breakTimeOption.value) || 0 },
    () => {
      console.log(`Saved break time: ${breakTimeOption.value}`);
    }
  );
});

function displaySavedValues() {
  chrome.storage.local.get(["workTime", "breakTime", "isRunning"], (result) => {
    console.log("Stored Values: ", result);
  });
}

// Initialize the saved values at startup
displaySavedValues();
