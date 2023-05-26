import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

const refs = {
  picker: document.querySelector("#datetime-picker"),
  startBtn: document.querySelector("button[data-start]"),
  daysValue: document.querySelector("[data-days]"),
  hoursValue: document.querySelector("[data-hours]"),
  minutesValue: document.querySelector("[data-minutes]"),
  secondsValue: document.querySelector("[data-seconds]")
};

const { picker, startBtn, daysValue, hoursValue, minutesValue, secondsValue } = refs;

startBtn.disabled = true;
let intervalId = null;
let selectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];

    if (selectedDate <= new Date()) {
      Notiflix.Notify.failure("Please choose a date in the future");
      return;
    }

    startBtn.disabled = false;
  },
};

const datePickerComp = flatpickr(picker, options);

startBtn.addEventListener("click", startTimer);

const intervalCallBack = () => {

  const leftMIllisecond = datePickerComp.latestSelectedDateObj.getTime() - Date.now();

    const {days, hours, minutes, seconds } = convertMs(leftMIllisecond);
      daysValue.innerHTML = addLeadingZero(days);
      hoursValue.innerHTML = addLeadingZero(hours);
      minutesValue.innerHTML = addLeadingZero(minutes);
      secondsValue.innerHTML = addLeadingZero(seconds);
      
  if (leftMIllisecond < 1000) {
    clearInterval(intervalId);
  }
}

function startTimer() {
  intervalId = setInterval(intervalCallBack, 1000);

  if (startTimer) {
    startBtn.disabled = true;
    picker.disabled = true;
  }
};

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
  return String(value).padStart(2, "0");
}