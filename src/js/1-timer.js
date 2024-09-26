// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';
//www
const dateRezult = document.querySelector('#datetime-picker');
const dateBtn = document.querySelector('[data-start]');
const rezultDays = document.querySelector('[data-days]');
const rezultHours = document.querySelector('[data-hours]');
const rezultMinutes = document.querySelector('[data-minutes]');
const rezultSeconds = document.querySelector('[data-seconds]');
let userSelectedDate = 0;
let intervalId = 0;
dateBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      return iziToast.error({
        position: 'topRight',
        message: 'Please choose a date in the future',
      });
    }
    userSelectedDate = selectedDates[0];
    dateBtn.disabled = false;
  },
};
flatpickr(dateRezult, options);

function wiggleWiggleTimer() {
  dateRezult.disabled = true;
  dateBtn.disabled = true;

  intervalId = setInterval(clockUp, 1000);
  return;
}

function clockUp() {
  const curentTime = userSelectedDate - new Date();

  if (curentTime <= 0) {
    dateRezult.disabled = false;

    clearInterval(intervalId);
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(curentTime);

  rezultDays.textContent = String(days).padStart(2, 0);
  rezultHours.textContent = String(hours).padStart(2, 0);
  rezultMinutes.textContent = String(minutes).padStart(2, 0);
  rezultSeconds.textContent = String(seconds).padStart(2, 0);
}
dateBtn.addEventListener('click', wiggleWiggleTimer);

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
