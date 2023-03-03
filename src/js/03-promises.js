/*
   Генератор промісів.
  1. HTML містить розмітку форми, в поля якої користувач буде вводити першу затримку в мілісекундах,
    крок збільшення затримки для кожного промісу після першого і кількість промісів, яку необхідно створити.
  2. Напиши скрипт, який на момент сабміту форми викликає функцію createPromise(position, delay) стільки разів, скільки ввели в поле amount. 
  Під час кожного виклику передай їй номер промісу (position), що створюється, і затримку, враховуючи першу затримку (delay), введену користувачем, і крок (step).

*/

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
 
      // циклі стільки раз викликаємо функцію створення проміса, скільки amount ввів користувач в інпут
  for (let position = 1; position <= amount; position += 1) {
   
    createPromise(position, firstDelay)
      .then(({ position, delay }) => {
          // повідомлення у разі успішного виконання проміса
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`,
          {
            width: '400px',
            fontSize: '20px', 
        });
    })
      .catch(({ position, delay }) => {
          // повідомлення у разі неуспішного виконання проміса
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`, {
          width: '400px',
          fontSize: '20px',
      });
      });
    
        // Першу затримку (delay), введену користувачем, збільшується на кожній ітерації на крок (step).
    firstDelay += step;
  }

}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {

    setTimeout(() => {
      
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      }
      else {
        reject({ position, delay });
      }
    }, delay);

  })
 
}