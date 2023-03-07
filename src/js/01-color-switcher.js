const startBtn = document.querySelector('[data-start]');
const stoptBtn = document.querySelector('[data-stop]');
let intervalId;

stoptBtn.setAttribute('disabled', 'true');

startBtn.addEventListener('click', onClikChangeColor);
stoptBtn.addEventListener('click', onClikStopChangeColor);

function onClikChangeColor() {
  if (startBtn.getAttribute('disabled')) {
    return;
  }
  startBtn.setAttribute('disabled', 'true');
  stoptBtn.removeAttribute('disabled');

  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onClikStopChangeColor() {
  if (!startBtn.getAttribute('disabled')) {
    return;
  }
  startBtn.removeAttribute('disabled');
  stoptBtn.setAttribute('disabled', 'true');

  clearInterval(intervalId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
