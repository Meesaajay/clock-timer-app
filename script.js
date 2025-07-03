// Clock Logic
function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  document.getElementById("clock").textContent = `${h}:${m}:${s}`;
}
setInterval(updateClock, 1000);
updateClock();  


let timer;
let timeLeft = 0;
let isPaused = false;

function startCountdown() {
  const min = parseInt(document.getElementById("minutes").value) || 0;
  const sec = parseInt(document.getElementById("seconds").value) || 0;
  if (min === 0 && sec === 0 && timeLeft === 0) return;

  if (!timeLeft || timeLeft <= 0) {
    timeLeft = min * 60 + sec;
  }

  if (isPaused) {
    isPaused = false;
  }

  if (timer) clearInterval(timer);
  timer = setInterval(() => {
    if (!isPaused) {
      if (timeLeft <= 0) {
        clearInterval(timer);
        document.getElementById("timerDisplay").textContent = "00:00";
        document.getElementById("alarmSound").play();
        return;
      }
      timeLeft--;
      updateTimerDisplay();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const mins = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const secs = String(timeLeft % 60).padStart(2, '0');
  document.getElementById("timerDisplay").textContent = `${mins}:${secs}`;
}

function pauseCountdown() {
  isPaused = true;
}

function resetCountdown() {
  clearInterval(timer);
  timeLeft = 0;
  isPaused = false;
  document.getElementById("timerDisplay").textContent = "00:00";
  document.getElementById("minutes").value = "";
  document.getElementById("seconds").value = "";
}
