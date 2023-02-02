import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix';

const startBtn = document.querySelector('button[data-start]');
const timerInput = document.querySelector('input#datetime-picker');
const timerDays = document.querySelector('.value[data-days]');
const timerHours = document.querySelector('.value[data-hours]');
const timerMinutes = document.querySelector('.value[data-minutes]');
const timerSeconds = document.querySelector('.value[data-seconds]');

const currentTime = new Date();

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= currentTime) {
      Notify.warning('Please choose a date in the  future');
    } else {
      startBtn.disabled = false;
    }
  },
};
startBtn.addEventListener('click', onBtnClick);
flatpickr(timerInput, options);

let timerId = null;
function onBtnClick() {
  const inputDate = new Date(timerInput.value);
  startBtn.disabled = true;

  timerId = setInterval(() => {
    const timeSubtraction = inputDate - new Date();
    const time = convertMs(timeSubtraction);
    // console.log(convertMs(timeSubtraction));
    updateTime(time);
    if (timeSubtraction < 1000) {
      //console.log(1)
      clearInterval(timerId);
      Notify.info('It is a time!!!');
    }
  }, 1000);
}
function updateTime({ days, hours, minutes, seconds }) {
  timerDays.textContent = days;
  timerHours.textContent = hours;
  timerMinutes.textContent = minutes;
  timerSeconds.textContent = seconds;
}
startBtn.disabled = true;
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );
  return { days, hours, minutes, seconds };
}
