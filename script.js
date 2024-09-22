let startTime, updatedTime, difference, tInterval;
let running = false;
let laps = [];

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const stopwatch = document.getElementById('stopwatch');
const lapsContainer = document.getElementById('laps');

startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);

function start() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 1);
        running = true;
        stopwatch.style.backgroundColor = 'green';
    }
}

function pause() {
    if (running) {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        running = false;
        stopwatch.style.backgroundColor = 'red';
    }
}

function reset() {
    clearInterval(tInterval);
    display.innerHTML = "00:00:00";
    difference = 0;
    running = false;
    laps = [];
    lapsContainer.innerHTML = '';
    stopwatch.style.backgroundColor = 'white';
}

function recordLap() {
    if (running) {
        laps.push(display.innerHTML);
        const lapElement = document.createElement('li');
        lapElement.textContent = display.innerHTML;
        lapsContainer.appendChild(lapElement);
        stopwatch.style.backgroundColor = 'orange';
        setTimeout(() => stopwatch.style.backgroundColor = 'green', 500);
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);
    
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;
    
    display.innerHTML = `${hours}:${minutes}:${seconds}:${milliseconds}`;
}
