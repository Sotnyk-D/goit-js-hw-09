import { Notify } from 'notiflix';

function createPromise(position, delay) {
  const promis = new Promise((resolt, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolt({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
  return promis;
}
const formElement = document.querySelector('.form');
formElement.addEventListener('submit', onSubmite);
function onSubmite(evt) {
  evt.preventDefault();
  let delay = Number(evt.currentTarget.delay.value);
  const amount = Number(evt.currentTarget.amount.value);
  const step = Number(evt.currentTarget.step.value);
  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay).then(onSucces).catch(onError);
    delay += step;
  }
}
function onSucces({ position, delay }) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

function onError({ position, delay }) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}
