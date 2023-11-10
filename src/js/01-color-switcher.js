const refs = {
    startBtnEl: document.querySelector('[data-start]'),
    stopBtnEl: document.querySelector('[data-stop]'),
    timerId: null
}

refs.stopBtnEl.disabled = true;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

refs.startBtnEl.addEventListener('click', () => {
    refs.startBtnEl.disabled = true;
    refs.stopBtnEl.disabled = false;

    timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();

    }, 1000);
})

refs.stopBtnEl.addEventListener('click', () => {
    refs.stopBtnEl.disabled = true;
    refs.startBtnEl.disabled = false;

    clearInterval(timerId);
})
