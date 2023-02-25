/*

1. Напиши скрипт, який після натискання кнопки «Start», раз на секунду змінює колір фону <body> на випадкове значення, використовуючи інлайн стиль.
2. Натисканням на кнопку «Stop» зміна кольору фону повинна зупинятися.
3. Враховуй, що на кнопку «Start» можна натиснути нескінченну кількість разів.
 Зроби так, щоб доки зміна теми запущена, кнопка «Start» була неактивною (disabled).
4. function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

*/

function getRandomHexColor() {
	return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
  
const btnStartRef = document.querySelector('button[data-start]');
const bodyRef = document.querySelector('body');
const btnStopRef = document.querySelector('button[data-stop]');

// добавляє класс для стилізації кнопок (не по т/з)
btnStartRef.classList.add('btn');
btnStopRef.classList.add('btn');

let intervalId = null;

btnStartRef.addEventListener('click', onBtnStartClick);
btnStopRef.addEventListener('click', onBtnStopClick);


function onBtnStartClick() { 

	btnStartRef.disabled = true;
	intervalId = setInterval(bodyColorized, 1000);

}
function onBtnStopClick() { 
	clearInterval(intervalId);
	btnStartRef.disabled = false;
}

function bodyColorized() {
	bodyRef.style.backgroundColor = getRandomHexColor();
}
 

