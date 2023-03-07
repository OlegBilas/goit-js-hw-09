import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('[data-start]');
const dateTimePicker = document.querySelector('input#datetime-picker');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');

startBtn.setAttribute('disabled', 'true');
startBtn.addEventListener('click', onClickStartTimer, { once: true });
dateTimePicker.addEventListener('input', onInputDateEnter);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    return selectedDates[0];
  },
};

const timer = {
  currentTime: Date.now(),
  selectedTime: flatpickr(dateTimePicker, options).selectedDates[0].getTime(),
  isDateCorrect() {
    if (this.selectedTime - this.currentTime > 0) {
      startBtn.removeAttribute('disabled');
      return this.selectedTime - this.currentTime;
    } else {
      return alert('Please choose a date in the future');
    }
  },
  startTimeOut() {
    if (this.isDateCorrect()) {
      return this.selectedTime - this.currentTime;
    }
  },
};

function onClickStartTimer() {
  startBtn.setAttribute('disabled', 'true');
  const dateDifference = timer.startTimeOut.call(timer);

  setInterval(() => {
    const { days, hours, minutes, seconds } = convertMs(dateDifference);
    daysRef.textContent = days;
    hoursRef.textContent = hours.toString.padstart(2, '0');
    minutesRef.textContent = minutes.toString.padstart(2, '0');
    secondsRef.textContent = seconds.toString.padstart(2, '0');
  }, 1000);
}

function onInputDateEnter() {
  timer.isDateCorrect.call(timer);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
