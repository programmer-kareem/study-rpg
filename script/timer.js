let focusTypeSelector = document.querySelectorAll(".focus-mode-option");
let notificationPopup = document.querySelector(".notification-popup");
let informationPopup = document.querySelector(".information-popup");
let confirmationPopup = document.querySelector(".confirmation-popup");
let counterDisplayer = document.querySelector(".timer");
let counterStartButton = document.querySelector(".timer-start-button");
let counterResetButton = document.querySelector(".timer-reset-button");
let counterPauseButton = document.querySelector(".timer-pause-button");
let defaultTimer = {
  hours: "00",
  minutes: "30",
  seconds: "00"
}
let defaultStopwatch = {
  hours: "00",
  minutes: "00",
  seconds: "00"
}
let defaultPomodoro = {
  hours: "00",
  minutes: "25",
  seconds: "00",
  shortBreakInMin: "5",
  longBreakInMin: "10",
  longBreakRoundInterval: "3"
}
let currentFocusMode = "timer";
let interval;
let lastTimerDuration;
let isCounterRunning = false;
let endTime;
let remainingTime;

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
}


function closePopup(popup) {
  popup.style.display = "none";
}

function closeAllPopups() {
  document.querySelectorAll(".popup").forEach((popup) => {
    popup.style.display = "none";
  })
}

function updateTimer(timeInfo, currentFocusMode) {
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
  if (currentFocusType === "timer") {
    
  }
  if (currentFocusType === "stopwatch") {}
  
  if (currentFocusType === "pomodoro") {}
  
}

function setFocusType(fT) {
  switch (fT) {
    case "timer":
      counterDisplayer.innerText = `${defaultTimer.hours}:${defaultTimer.minutes}:${defaultTimer.seconds}`
      break;
    case "stopwatch":
      counterDisplayer.innerText = `${defaultStopwatch.hours}:${defaultStopwatch.minutes}:${defaultStopwatch.seconds}`
      break;
    case "pomodoro":
      counterDisplayer.innerText = `${defaultPomodoro.hours}:${defaultPomodoro.minutes}:${defaultPomodoro.seconds}`
      break;
      
  }
  
}

function setTimer() {
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
      startTimer(toMilliseconds(Number(defaultTimer.hours)), Number(defaultTimer.minutes));
    } else {
      let duration = toMilliseconds(Number(timerHoursInput.value), Number(timerMinutesInput.value));
      startTimer(duration);
    }
  }
}


function startTimer(duration) {
  lastTimerDuration = duration;
  isCounterRunning = true;
  let startTime = Date.now();
  endTime = startTime + duration;
  interval = setInterval(() => {
    let timeLeft = endTime - Date.now();
    
    updateTimer(timeLeft, "timer");
  }, 100)
  closeAllPopups();
  showFocusActionButton();
}

function startStopwatch() {
  let startTime = Date.now();
  let elapsedTime;
  interval = setInterval(() => {
     elapsedTime = Date.now() - startTime;
    updateTimer(elapsedTime, "stopwatch")
  }, 100)
  closeAllPopups();
  showFocusActionButton();
}

function setPomodoro(sessionDuration, breakTime, rounds, longBreakDuration, longBreakRoundInterval) {}

function pauseCounter() {
  remainingTime = endTime - Date.now();
  clearInterval(interval);
  isCounterRunning = false;
  let pauseIcon = document.querySelector(".timer-pause-icon");
  pauseIcon.classList.remove("ph-stop");
  pauseIcon.classList.add("ph-play");
}

function resumeCounter() {
  // rsune counter
  //duration = remaining time
  endTime = Date.now() + remainingTime;
  
  interval = setInterval(() => {
    let timeLeft = endTime - Date.now()
    updateTimer(timeLeft, currentFocusMode)
  }, 100)
  isCounterRunning = true;
  let pauseIcon = document.querySelector(".timer-pause-icon");
  pauseIcon.classList.remove("ph-play");
  pauseIcon.classList.add("ph-stop");
}

function stopCounter() {
  clearInterval(interval);
  isCounterRunning = false;
}

//focus type
focusTypeSelector.forEach((focusType) => {
  focusType.addEventListener("click", () => {
    focusTypeSelector.forEach((options) => {
      options.classList.remove("active");
    })
    focusType.classList.add("active");
    currentFocusMode = focusType.dataset.focusType;
    setFocusType(currentFocusMode)
  });
});

function resetCounter(f) {
  // fun to reset time
  switch (f) {
    case "timer":
      counterDisplayer.innerText = toHours(Number(lastTimerDuration));
      console.log(lastTimerDuration);
      break;
    case "stopwatch":
      
      break;
    case "pomodoro":
      
      break;
  }
}

function hideFocusActionButton() {
  // to hide primary action button
  counterResetButton.classList.add("hidden");
  counterPauseButton.classList.add("hidden");
  counterStartButton.classList.remove("hidden");
}

function showFocusActionButton() {
  // to show it
  counterResetButton.classList.remove("hidden");
  counterPauseButton.classList.remove("hidden");
  counterStartButton.classList.add("hidden");
  
}
counterDisplayer.onclick = () => {
  switch (currentFocusMode) {
    case "timer":
      setTimer();
      break;
    case "stopwatch":
      break;
    case "pomodoro":
      alert("p")
      break;
  }
}
counterStartButton.onclick = () => {
  if (isCounterRunning === false) {
    switch (currentFocusMode) {
      case "timer":
        startTimer(toMilliseconds(Number(defaultTimer.hours)), Number(defaultTimer.minutes));
        break;
      case "stopwatch":
        startStopwatch();
        break;
      case "pomodoro":
        alert("p")
        break;
    }
  }
}
counterResetButton.onclick = () => {
  pauseCounter();
  resetCounter(currentFocusMode);
  hideFocusActionButton()
}
counterPauseButton.onclick = () => {
  if (isCounterRunning === false) {
    resumeCounter()
  } else {
    pauseCounter();
  }
  
  
}