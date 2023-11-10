//Task 3
import Notiflix from "notiflix";

const refs = {
  delayEl: document.querySelector('input[name = "delay"]'),
  stepEl: document.querySelector('input[name = "step"]'),
  amountEl: document.querySelector('input[name="amount"]'),
  formEl: document.querySelector('.form')
}


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay })
      } else {
        reject({ position, delay })
      }
    }, delay)
  })
}

refs.formEl.addEventListener('submit', onFormSubmit)


function onFormSubmit(event) {
  event.preventDefault();

  const { delayEl, stepEl, amountEl } = refs;
  const delay = Number(delayEl.value);
  const step = Number(stepEl.value);
  const amount = Number(amountEl.value);

  for (let i = 0; i <= amount; i++) {
    const currentDelay = delay + i * step;
    createPromise(i, currentDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position + 1} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position + 1} in ${delay}ms`);
      });

  }
}