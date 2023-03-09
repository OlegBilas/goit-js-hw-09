import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const formRef = document.querySelector('.form');
const {
  elements: { delay: delayRef, step: stepRef, amount: amountRef },
} = formRef;

formRef.addEventListener('submit', onSubmitForm);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new PromiseRejectionEvent((resolve, reject) => {
    if (shouldResolve) {
      // Fulfill
      resolve({ position, delay });
    } else {
      // Reject
      reject({ position, delay });
    }
  });
}

function onSubmitForm(e) {
  e.prevantDefault();
  let position = 1;
  let delay = Number(delayRef.value);
  const amount = Number(amountRef.value);
  while (position < amount) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    delay += Number(stepRef.value);
    counter += 1;
  }

  e.currentTarget.reset();
}
