// Constants
const INTERVAL_MS = 10; // Smooth update every 10ms
let timerID;
let lastTimerStartTime = 0;
let millisElapsedBeforeLastStart = 0;

// DOM Elements
const timer = document.getElementById("timer");
const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");
const resetButton = document.getElementById("reset-button");

// Event Listeners (after DOM is loaded)
document.addEventListener("DOMContentLoaded", () => {
  startButton.addEventListener("click", startTimer);
  stopButton.addEventListener("click", stopTimer);
  resetButton.addEventListener("click", resetTimer);
});

// Start Timer
function startTimer() {
  startButton.disabled = true;
  stopButton.disabled = false;
  resetButton.disabled = true;

  lastTimerStartTime = Date.now();
  timerID = setInterval(updateTimer, INTERVAL_MS);
}

// Stop Timer
function stopTimer() {
  startButton.disabled = false;
  stopButton.disabled = true;
  resetButton.disabled = false;

  millisElapsedBeforeLastStart += Date.now() - lastTimerStartTime;
  clearInterval(timerID);
}

// Reset Timer
function resetTimer() {
  resetButton.disabled = true;
  startButton.disabled = false;
  stopButton.disabled = true;

  clearInterval(timerID);
  timer.textContent = "00:00:000";
  millisElapsedBeforeLastStart = 0;
}

// Update Timer Display
function updateTimer() {
  const millisElapsed =
    Date.now() - lastTimerStartTime + millisElapsedBeforeLastStart;
  const secondsElapsed = millisElapsed / 1000;
  const minutesElapsed = secondsElapsed / 60;

  const millisText = formatNumber(millisElapsed % 1000, 3);
  const secondsText = formatNumber(Math.floor(secondsElapsed) % 60, 2);
  const minutesText = formatNumber(Math.floor(minutesElapsed), 2);

  timer.textContent = `${minutesText}:${secondsText}:${millisText}`;
}

// Format Number with Leading Zeros
function formatNumber(number, desiredLength) {
  const stringNumber = String(Math.floor(number));
  if (stringNumber.length > desiredLength) {
    return stringNumber.slice(0, desiredLength);
  }
  return stringNumber.padStart(desiredLength, "0");
}
