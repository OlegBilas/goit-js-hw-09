import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const startBtn = document.querySelector('[data-start]');
const dateTimePicker = document.querySelector('input#datetime-picker');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');
let selectedDateTime;

startBtn.setAttribute('disabled', 'true');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};
const fpck = flatpickr(dateTimePicker, options);
fpck.config.onClose.push(selectedDates => {
  selectedDateTime = selectedDates[0].getTime();
  timer.isDateCorrect.call(timer);
});

const timer = {
  currentTime: Date.now(),

  isDateCorrect() {
    if (selectedDateTime > this.currentTime) {
      startBtn.removeAttribute('disabled');
    } else {
      startBtn.setAttribute('disabled', 'true');
      //alert('Please choose a date in the future');
      Notiflix.Report.warning(
        'Warning!',
        'Please choose a date in the future',
        'Ok'
      );
    }
  },
  startTimeOut() {
    return selectedDateTime - Date.now();
  },
};

startBtn.addEventListener('click', onClickStartTimer, { once: true });

function onClickStartTimer() {
  startBtn.setAttribute('disabled', 'true');

  const intervalId = setInterval(() => {
    const dateDifference = timer.startTimeOut.call(timer);
    if (dateDifference >= 0) {
      const { days, hours, minutes, seconds } = convertMs(dateDifference);
      daysRef.textContent = addLeadingZero(days);
      hoursRef.textContent = addLeadingZero(hours);
      minutesRef.textContent = addLeadingZero(minutes);
      secondsRef.textContent = addLeadingZero(seconds);
    } else {
      clearInterval(intervalId);
      secondsRef.textContent = '00';
    }
  }, 1000);
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

function addLeadingZero(value) {
  if (value < 100) {
    return value.toString().padStart(2, '0');
  } else {
    return value;
  }
}
