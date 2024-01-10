// chrome.alarms.create("pomodoroTimer", {
//   periodInMinutes: 1 / 60,
// });

// chrome.alarms.onAlarm.addListener((alarm) => {
//   if (alarm.name === "pomodoroTimer") {
//     chrome.storage.local.get(["timer", "isRunning", "workTimer"], (res) => {
//       if (res.isRunning) {
//         let timer = res.timer + 1;
//         let isRunning = true;
//         // if (timer === 60 * res.workTimer) {
//         //   this.registration.showNotification("Pomodoro Timer", {
//         //     body: `${res.workTimer} minutes has passed`,
//         //     icon: "icon.png",
//         //   });
//         //   timer = 0;
//         //   isRunning = false;
//         // }
//         chrome.storage.local.set({
//           timer,
//           isRunning,
//         });
//       }
//     });
//   }
// });

// chrome.storage.local.get(["timer", "isRunning", "workTimer"], (res) => {
//   chrome.storage.local.set({
//     timer: "timer" in res ? res.timer : 0,
//     workTimer: "workTimer" in res ? res.workTimer : 25,
//     isRunning: "isRunning" in res ? res.isRunning : false,
//   });
// });
