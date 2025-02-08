let countdownInterval;
let remainingTime;
let isPaused = false;

function startTimer() {
    const timeInput = document.getElementById('timeInput').value;
    const durationInput = document.getElementById('durationInput').value;
    let endTime;
    
    if (timeInput) {
        endTime = new Date();
        const [hours, minutes] = timeInput.split(':');
        endTime.setHours(hours, minutes, 0);
    } else if (durationInput && /^\d{2}:\d{2}:\d{2}$/.test(durationInput)) {
        let [h, m, s] = durationInput.split(':').map(Number);
        
        if (m >= 60 || s >= 60) {
            alert('Els minuts i segons no poden ser majors de 59.');
            return;
        }
        
        endTime = new Date(Date.now() + (h * 3600 + m * 60 + s) * 1000);
    } else {
        alert('Introduïu un temps vàlid en format HH:MM:SS.');
        return;
    }

    remainingTime = endTime - new Date();
    isPaused = false;
    updateCountdown();
}

function updateCountdown() {
    clearInterval(countdownInterval);
    countdownInterval = setInterval(() => {
        if (!isPaused) {
            remainingTime -= 1000;
            if (remainingTime <= 0) {
                clearInterval(countdownInterval);
                displayTime(0); // Asegura que el contador muestre 00:00:00
                playSound();
            } else {
                displayTime(remainingTime);
            }
        }
    }, 1000);
}

function pauseTimer() {
    isPaused = !isPaused;
    document.getElementById('pauseButton').textContent = isPaused ? 'Reprendre' : 'Pausar';
}

function displayTime(milliseconds) {
    const hours = Math.floor(milliseconds / 3600000).toString().padStart(2, '0');
    const minutes = Math.floor((milliseconds % 3600000) / 60000).toString().padStart(2, '0');
    const seconds = Math.floor((milliseconds % 60000) / 1000).toString().padStart(2, '0');
    document.getElementById('countdown').textContent = `${hours}:${minutes}:${seconds}`;
}

function playSound() {
    const soundSelect = document.getElementById('soundSelect').value;
    const audio = new Audio(soundSelect);
    audio.play();
}

