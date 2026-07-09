let focusTypeSelector = document.querySelectorAll(".focus-mode-option");
let notificationPopup = document.querySelector(".notification-popup");
let informationPopup = document.querySelector(".information-popup");
let confirmationPopup = document.querySelector(".confirmation-popup");
let counterDisplayer = document.querySelector(".timer");
let counterStartButton = document.querySelector(".timer-start-button");
let counterResetButton = document.querySelector(".timer-reset-button");
let counterPauseButton = document.querySelector(".timer-pause-button");
let timer = {
  hours: "00",
  minutes: "30",
  seconds: "00",
  
  duration: toMilliseconds(0, 30),
  startTime: 0,
  endTime: 0,
  remainingTime: 0,
  
  lastDuration: 0
}
let stopwatch = {
  hours: "00",
  minutes: "00",
  seconds: "00",
  
  startTime: 0,
  elapsedTime: 0,
  elapsedTimeUntilPause: 0,
  timeLeft: 0,
  lastCounterDuration: 0
}
let pomodoro = {
  hours: "00",
  minutes: "25",
  seconds: "00",
  
  sessionDuration: toMilliseconds(25),
  shortBreak: toMilliseconds(5),
  longBreak: toMilliseconds(10),
  
  longBreakRoundInterval: 3,
  
  round: 1,
  state: "idle",
  
  startTime: 0,
  endTime: 0,
  remainingTime: 0,
  timeLeft: 0
}
let currentFocusMode = "timer";
let interval;
let hasCounterStarted = false;
let isCounterRunning = false;
let currentDisplayedPopup = "none";

function toMilliseconds(hours, minutes) {
  return ((hours * 60) + minutes) * 60 * 1000;
}

function toHours(ms) {
  let hours = Math.floor(ms / (1000 * 60 * 60));
  let minutes = Math.floor(ms / (1000 * 60)) % 60;
  let seconds = Math.floor(ms / 1000) % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
}

function displayInformationPopup(header, content, buttonText) {
  informationPopup.style.display = "block";
  document.querySelector(".information-popup-header-title").innerText = header;
  let informationContent = document.querySelector(".information-content");
  informationContent.innerHTML = "";
  informationContent.appendChild(content)
  let buttons = document.querySelectorAll(".information-popup-footer-buttons");
  if (buttonText.btnLeft === null) {
    buttons[0].style.display = "none";
    buttons[1].innerText = buttonText.btnRight;
  } else {
    buttons[0].style.display = "";
    buttons[0].innerText = buttonText.btnLeft;
    buttons[1].innerText = buttonText.btnRight;
  }
  currentDisplayedPopup = "informationPopup";
}

function displayNotificationPopup(header, content, buttonText) {
  notificationPopup.style.display = "block";
  document.querySelector(".notification-popup-header-title").innerText = header;
  let informationContent = document.querySelector(".notification-content");
  informationContent.innerHTML = "";
  informationContent.appendChild(content)
  let button = document.querySelector(".notification-popup-footer-buttons");
  button.innerText = buttonText.btn1;
  currentDisplayedPopup = "informationPopup";
}

function closePopup() {
  currentDisplayedPopup.style.display = "none";
  currentDisplayedPopup = "";
}

function closeAllPopups() {
  document.querySelectorAll(".popup").forEach((popup) => {
    popup.style.display = "none";
  })
  currentDisplayedPopup = "";
}

function updateCounter(timeInfo) {
  
  switch (currentFocusMode) {
    case "timer":
      counterDisplayer.innerText = toHours(timeInfo);
      break;
    case "stopwatch":
      counterDisplayer.innerText = toHours(timeInfo);
      break;
    case "pomodoro":
      alert("p")
      break;
  }
}

function setFocusType() {
  switch (currentFocusMode) {
    case "timer":
      counterDisplayer.innerText = `${timer.hours}:${timer.minutes}:${timer.seconds}`
      break;
    case "stopwatch":
      counterDisplayer.innerText = `${stopwatch.hours}:${stopwatch.minutes}:${stopwatch.seconds}`
      break;
    case "pomodoro":
      counterDisplayer.innerText = `${pomodoro.hours}:${pomodoro.minutes}:${pomodoro.seconds}`
      break;
      
  }
}
//check if counter ends
function checkIfCounterEnds() {
  switch (currentFocusMode) {
    case "timer":
      if (timer.timeLeft <= 0) {
        handleCounterCompletion();
        return;
      }
      else {
        updateCounter(timer.timeLeft);
      }
      break;
    case "stopwatch":
      //no need
      break;
    case "pomodoro":
      alert("p")
      break;
  }
  
  
}
//every ficus type will be handled by this
function setCounter() {
  switch (currentFocusMode) {
    case "timer": {
      //information popup content init
      let header = "Set Timer Duration"
      let contentBox = document.createElement("div");
      contentBox.classList.add("popup-content-box");
      //hours input
      let timerHoursInputHeader = document.createElement("div");
      timerHoursInputHeader.classList.add("popup-prompt-header");
      timerHoursInputHeader.innerText = "Hours:"
      let timerHoursInput = document.createElement("input");
      timerHoursInput.classList.add("popup-input");
      timerHoursInput.placeholder = "00"
      //mins input
      let timerMinutesInputHeader = document.createElement("div");
      timerMinutesInputHeader.classList.add("popup-prompt-header");
      timerMinutesInputHeader.innerText = "Minutes:"
      let timerMinutesInput = document.createElement("input");
      timerMinutesInput.classList.add("popup-input");
      timerMinutesInput.placeholder = "30";
      timerHoursInput.type = "number";
      timerMinutesInput.type = "number";
      //appending childs to content box
      contentBox.appendChild(timerHoursInputHeader);
      contentBox.appendChild(timerHoursInput);
      contentBox.appendChild(timerMinutesInputHeader);
      contentBox.appendChild(timerMinutesInput);
      
      //buttons text, cancel and start
      let buttonsText = {
        btnLeft: "Cancel",
        btnRight: "Start"
      }
      displayInformationPopup(header, contentBox, buttonsText);
      let startButton = document.querySelectorAll(".information-popup-footer-buttons");
      startButton[1].onclick = () => {
        if (timerHoursInput.value === "" && timerMinutesInput.value === "") {
          timer.duration = toMilliseconds(Number(timer.hours), Number(timer.minutes));
          startCounter();
        } else {
          timer.duration = toMilliseconds(Number(timerHoursInput.value), Number(timerMinutesInput.value));
          startCounter();
        }
      }
      break;
    }
    case "stopwatch": {
      //no need to setup stopwatch 
      break;
    }
    case "pomodoro": {
      //pomodoro setup
      //information popup content init
      let header = "Set Pomodoro"
      let contentBox = document.createElement("div");
      contentBox.classList.add("popup-content-box");
      //hours input
      let timerHoursInputHeader = document.createElement("div");
      timerHoursInputHeader.classList.add("popup-prompt-header");
      timerHoursInputHeader.innerText = "Hours:"
      let timerHoursInput = document.createElement("input");
      timerHoursInput.classList.add("popup-input");
      timerHoursInput.placeholder = "00"
      //mins input
      let timerMinutesInputHeader = document.createElement("div");
      timerMinutesInputHeader.classList.add("popup-prompt-header");
      timerMinutesInputHeader.innerText = "Minutes:"
      let timerMinutesInput = document.createElement("input");
      timerMinutesInput.classList.add("popup-input");
      timerMinutesInput.placeholder = "30";
      timerHoursInput.type = "number";
      timerMinutesInput.type = "number";
      //appending childs to content box
      contentBox.appendChild(timerHoursInputHeader);
      contentBox.appendChild(timerHoursInput);
      contentBox.appendChild(timerMinutesInputHeader);
      contentBox.appendChild(timerMinutesInput);
      
      //buttons text, cancel and start
      let buttonsText = {
        btnLeft: "Cancel",
        btnRight: "Start"
      }
      displayInformationPopup(header, contentBox, buttonsText);
      let startButton = document.querySelectorAll(".information-popup-footer-buttons");
      startButton[1].onclick = () => {
        if (timerHoursInput.value === "" && timerMinutesInput.value === "") {
          timer.duration = toMilliseconds(Number(timer.hours), Number(timer.minutes));
          startCounter();
        } else {
          timer.duration = toMilliseconds(Number(timerHoursInput.value), Number(timerMinutesInput.value));
          startCounter();
        }
      }
      break;
    }
  }
}

function startCounter() {
  switch (currentFocusMode) {
    case "timer": {
      timer.lastTimerDuration = timer.duration;
      timer.startTime = Date.now();
      timer.endTime = timer.startTime + timer.duration;
      interval = setInterval(() => {
        timer.timeLeft = timer.endTime - Date.now();
        checkIfCounterEnds();
      }, 100)
      closeAllPopups();
      showFocusActionButton();
      break;
    }
    case "stopwatch": {
      stopwatch.startTime = Date.now();
      interval = setInterval(() => {
        stopwatch.elapsedTime = Date.now() - stopwatch.startTime;
        updateCounter(stopwatch.elapsedTime)
      }, 100)
      closeAllPopups();
      showFocusActionButton();
      break;
    }
    case "pomodoro": {
      pauseCounter();
      break;
    }
  }
  isCounterRunning = true;
  hasCounterStarted = true;
}

function setPomodoro(sessionDuration, breakTime, rounds, longBreakDuration, longBreakRoundInterval) {}

function pauseCounter() {
  switch (currentFocusMode) {
    case "timer":
      timer.remainingTime = timer.endTime - Date.now();
      break;
    case "stopwatch":
      stopwatch.elapsedTimeUntillPause = stopwatch.elapsedTime;
      break;
    case "pomodoro":
      alert("p")
      break;
  }
  clearInterval(interval);
  isCounterRunning = false;
  let pauseIcon = document.querySelector(".timer-pause-icon");
  pauseIcon.classList.remove("ph-stop");
  pauseIcon.classList.add("ph-play");
}

function stopCounter() {
  clearInterval(interval);
  hideFocusActionButton();
  isCounterRunning = false;
  hasCounterStarted = false;
}

function handleCounterCompletion() {
  switch (currentFocusMode) {
    case "timer": {
      let contentBox = document.createElement("div");
      contentBox.classList.add("popup-content-box");
      let header = "Congratulations!"
      let paragraph = document.createElement("div");
      paragraph.classList.add("popup-prompt-header");
      paragraph.innerText = `Congratulations, You focused on something  productive rather than doom scrolling for ${toHours(timer.lastTimerDuration)}`
      //appending childs to content box
      contentBox.appendChild(paragraph);
      //buttons text, cancel and start
      let buttonsText = {
        btn1: "Continue"
      }
      displayNotificationPopup(header, contentBox, buttonsText);
      let continueButton = document.querySelectorAll(".notification-popup-footer-buttons");
      continueButton[1].onclick = () => {
        closeAllPopups();
      }
      break;
    }
    case "stopwatch": {
      // Tab to ed
      let contentBox = document.createElement("div");
      contentBox.classList.add("popup-content-box");
      let header = "Congratulations!"
      let paragraph = document.createElement("div");
      paragraph.classList.add("popup-prompt-header");
      paragraph.innerText = `Congratulations, You focused on something  productive rather than doom scrolling for ${toHours(stopwatch.lastCounterDuration)}`
      //appending childs to content box
      contentBox.appendChild(paragraph);
      //buttons text, cancel and start
      let buttonsText = {
        btn1: "Continue"
      }
      displayNotificationPopup(header, contentBox, buttonsText);
      let continueButton = document.querySelector(".notification-popup-footer-buttons");
      continueButton.onclick = () => {
        closeAllPopups();
      }
      break;
    }
    case "pomodoro": {
      // Tab to edit
      
      break;
    }
    default:
      stopCounter();
  }
}

function resumeCounter() {
  // rsune counter
  //duration = remaining time
  switch (currentFocusMode) {
    case "timer":
      timer.endTime = Date.now() + timer.remainingTime;
      interval = setInterval(() => {
        timer.timeLeft = timer.endTime - Date.now();
        checkIfCounterEnds();
      }, 100)
      break;
      
    case "stopwatch":
      stopwatch.startTime = Date.now() - stopwatch.elapsedTime;
      interval = setInterval(() => {
        stopwatch.elapsedTime = Date.now() - stopwatch.startTime;
        updateCounter(stopwatch.elapsedTime)
      }, 100);
      showFocusActionButton();
      break;
      
    case "pomodoro":
      alert("p")
      break;
  }
  isCounterRunning = true;
  let pauseIcon = document.querySelector(".timer-pause-icon");
  pauseIcon.classList.remove("ph-play");
  pauseIcon.classList.add("ph-stop");
}

function resetCounter() {
  // fun to reset time
  switch (currentFocusMode) {
    case "timer":
      counterDisplayer.innerText = toHours(Number(timer.lastTimerDuration));
      break;
    case "stopwatch":
      counterDisplayer.innerText = `${stopwatch.hours}:${stopwatch.minutes}:${stopwatch.seconds}`
      break;
    case "pomodoro":
      
      break;
  }
  stopCounter();
  hideFocusActionButton()
}

//focus type
focusTypeSelector.forEach((focusType) => {
  focusType.addEventListener("click", () => {
    if (isCounterRunning === false) {
      focusTypeSelector.forEach((options) => {
        options.classList.remove("active");
      })
      focusType.classList.add("active");
      currentFocusMode = focusType.dataset.focusType;
      setFocusType();
      hideFocusActionButton();
    }
  });
});

function hideFocusActionButton() {
  // to hide primary action button
  switch (currentFocusMode) {
    case "timer": {
      counterResetButton.classList.add("hidden");
      counterPauseButton.classList.add("hidden");
      counterStartButton.classList.remove("hidden");
      let pauseIcon = document.querySelector(".timer-pause-icon");
      pauseIcon.classList.remove("ph-stop");
      pauseIcon.classList.add("ph-play");
      break;
    }
    case "stopwatch": {
      if (hasCounterStarted === false) {
        //not running
        counterResetButton.classList.add("hidden");
        counterPauseButton.classList.add("hidden");
        counterStartButton.classList.remove("hidden");
        let pauseIcon = document.querySelector(".timer-pause-icon");
        pauseIcon.classList.remove("ph-stop");
        pauseIcon.classList.add("ph-play");
        
      } else {
        counterResetButton.classList.remove("hidden");
        counterPauseButton.classList.add("hidden");
        counterStartButton.classList.remove("hidden");
        let pauseIcon = document.querySelector(".timer-pause-icon");
        pauseIcon.classList.remove("ph-stop");
        pauseIcon.classList.add("ph-play");
      }
      
      break;
    }
    case "pomodoro": {
      counterResetButton.classList.add("hidden");
      counterPauseButton.classList.add("hidden");
      counterStartButton.classList.remove("hidden");
      let pauseIcon = document.querySelector(".timer-pause-icon");
      pauseIcon.classList.remove("ph-stop");
      pauseIcon.classList.add("ph-play");
      break;
    }
    default:
      // Tab to edit
  }
  
}

function showFocusActionButton() {
  // to show it
  switch (currentFocusMode) {
    case "timer": {
      counterResetButton.classList.remove("hidden");
      counterPauseButton.classList.remove("hidden");
      counterStartButton.classList.add("hidden");
      break;
    }
    case "stopwatch": {
      if (hasCounterStarted === false) {
        //not running
        counterResetButton.classList.add("hidden");
        counterPauseButton.classList.remove("hidden");
        counterStartButton.classList.add("hidden");
        let pauseIcon = document.querySelector(".timer-pause-icon");
        pauseIcon.classList.remove("ph-stop");
        pauseIcon.classList.add("ph-play");
        
      } else {
        alert('hiudhgajcgvsadhgsyud')
        counterResetButton.classList.add("hidden");
        counterPauseButton.classList.remove("hidden");
        counterStartButton.classList.remove("hidden");
        let pauseIcon = document.querySelector(".timer-pause-icon");
        pauseIcon.classList.remove("ph-stop");
        pauseIcon.classList.add("ph-play");
      }
      
      break;
    }
    case "pomodoro": {
      counterResetButton.classList.remove("hidden");
      counterPauseButton.classList.remove("hidden");
      counterStartButton.classList.add("hidden");
      break;
    }
    default:
      // Tab to edit
  }
  
  
}
counterDisplayer.onclick = () => {
  switch (currentFocusMode) {
    case "timer":
      setCounter();
      break;
    case "stopwatch":
      //nothing.. bro is mature enough to understand on its own
      break;
    case "pomodoro":
      alert("p")
      break;
  }
}
counterStartButton.onclick = () => {
  if (isCounterRunning === false) {
    startCounter();
  }
}
counterResetButton.onclick = () => {
  resetCounter();
}
counterPauseButton.onclick = () => {
  if (isCounterRunning === true) {
    pauseCounter();
  } else {
    resumeCounter();
  }
}
//.addEventListener("click", closePopup);
//.addEventListener("click", closePopup);
/*
FUNCTIONS

toMilliseconds()
toHours()

displayInformationPopup()
displayNotificationPopup()
closePopup()
closeAllPopups()

updateCounter()
setFocusType()
checkIfCounterEnds()

setCounter()
startCounter()
setPomodoro()

pauseCounter()
resumeCounter()
stopCounter()
handleCounterCompletion()
resetCounter()

hideFocusActionButton()
showFocusActionButton()

EVENTS
focusTypeSelector.click
counterDisplayer.click
counterStartButton.click
counterResetButton.click
counterPauseButton.click

*/