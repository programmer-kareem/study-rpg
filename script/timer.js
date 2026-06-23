let focusTypeSelector = document.querySelectorAll(".focus-mode-option");
let notificationPopup = document.querySelector(".notification-popup");
let informationPopup = document.querySelector(".information-popup");
let confirmationPopup = document.querySelector(".confirmation-popup");
let timerDisplayer = document.querySelector(".timer");
let timerStartButton = document.querySelector(".timer-start-button")
let focusMode;

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

function updateTimer(remainingTimeInfo, currentFocusType) {
  if (currentFocusType === "timer") {
    timerDisplayer.innerText = toHours(remainingTimeInfo);
  }
  if (currentFocusType === "stopwatch") {}
  
  if (currentFocusType === "pomodoro") {}
  
}

function setTimer() {
  //information popup content init
  let header = "Set Timer Duration"
  let contentBox = document.createElement("div");
  contentBox.classList.add("popup-content-box");
  //hours input
  let timerHoursInputHeader = document.createElement("div");
  timerHoursInputHeader.classList.add("popup-prompt-header");
  timerHoursInputHeader.innerText = "Enter Studying Duration in hours:"
  let timerHoursInput = document.createElement("input");
  timerHoursInput.classList.add("popup-input");
  timerHoursInput.placeholder = "01"
  //mins input
  let timerMinutesInputHeader = document.createElement("div");
  timerMinutesInputHeader.classList.add("popup-prompt-header");
  timerMinutesInputHeader.innerText = "Enter Studying Duration in minutes:"
  let timerMinutesInput = document.createElement("input");
  timerMinutesInput.classList.add("popup-input");
  timerMinutesInput.placeholder = "30";
  timerHoursInput.type = "number";
  timerMinutesInput.type = "number";
  timerHoursInput.value = "number";
  timerMinutesInput.value = "number";
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
    let duration = toMilliseconds(Number(timerHoursInput.value), Number(timerMinutesInput.value));
    
    console.log(timerHoursInput.value);
    console.log(timerMinutesInput.value);
    startTimer(duration)
  }
}


function startTimer(duration) {
  let startTime = Date.now();
  let endTime = startTime + duration;
  setInterval(() => {
    let timeLeft = endTime - Date.now();
    updateTimer(timeLeft, "timer")
  }, 1000)
  closeAllPopups()
}

function setStopwatch() {}

function setPomodoro(sessionDuration, breakTime, rounds, longBreakDuration, longBreakRoundInterval) {
  
}

focusTypeSelector.forEach((focusType) => {
  focusType.addEventListener("click", () => {
    focusTypeSelector.forEach((options) => {
      options.classList.remove("active");
    })
    focusType.classList.add("active");
    let focusMode = focusType.dataset.focusType;
    
  });
  
});

timerDisplayer.onclick = () => {
  setTimer();
}