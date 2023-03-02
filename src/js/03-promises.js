import Notiflix from 'notiflix';

const refs = {
  firstDelay: document.querySelector('input[name="delay"]'),
  stepDelay: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
  btnCreatePromise: document.querySelector('button[type="submit"]'),
  form: document.querySelector('.form'),
}



refs.form.addEventListener('submit', onBtnCreatePromiseClick);

function onBtnCreatePromiseClick(event) {
  event.preventDefault();

  let firstDelay = parseInt(refs.firstDelay.value);
  const step = parseInt(refs.stepDelay.value);
  const amount = parseInt(refs.amount.value);

  for (let position = 1; position <= amount; position += 1) {
   
    createPromise(position, firstDelay)
      .then(({ position, delay }) => {
     
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`,
          {
            width: '400px',
            fontSize: '20px', 
        });
    })
      .catch(({ position, delay }) => {
        
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`, {
          width: '400px',
          fontSize: '20px',
      });
      });
    
    firstDelay += step;
  }

}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  })
 
}