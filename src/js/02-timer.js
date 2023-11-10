import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';


const refs = {
    startBtn: document.querySelector('[data-start]'),
    daysEl: document.querySelector('[data-days]'),
    hoursEl: document.querySelector('[data-hours]'),
    minutesEl: document.querySelector('[data-minutes]'),
    secondsEl: document.querySelector('[data-seconds]'),
}

refs.startBtn.disabled = true;
refs.startBtn.addEventListener('click', onTimerStart)

let selectedDate = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        selectedDate = selectedDates[0];
        if (selectedDate < Date.now()) {
            refs.startBtn.disabled = true;
            Notiflix.Notify.failure('Please choose a date in the future');
        } else {
            refs.startBtn.disabled = false;
        }

    },
};

flatpickr('#datetime-picker', options);

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function onTimerStart(event) {
    setInterval(() => {
        const difference = selectedDate - Date.now();
        if (difference < 0) {
            return;
        }

        renderInfo(convertMs(difference));
    }, 1000)

}

function renderInfo(obj) {
    const { days, hours, minutes, seconds } = obj
    refs.daysEl.textContent = addLeadingZero(days);
    refs.hoursEl.textContent = addLeadingZero(hours);
    refs.minutesEl.textContent = addLeadingZero(minutes);
    refs.secondsEl.textContent = addLeadingZero(seconds);

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

