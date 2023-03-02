/*
 * Напиши скрипт таймера, який здійснює зворотний відлік до певної дати.
1. Використовуй бібліотеку flatpickr для того, щоб дозволити користувачеві кросбраузерно
 вибрати кінцеву дату і час в одному елементі інтерфейсу.
 */

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const btnStart = document.querySelector('[data-start]');
const inputDateRef = document.querySelector('#datetime-picker');
const valueDays = document.querySelector('[data-days]');
const valueHours = document.querySelector('[data-hours]');
const valueMinutes = document.querySelector('[data-minutes]');
const valueSeconds = document.querySelector('[data-seconds]');

// початковий стан кнопки "Start" - неактивна
btnStart.disabled = true;


btnStart.addEventListener('click', onBtnStartClick);

	// налаштування бібліотеки flatpickr
const options = {
		// Enables time picker
	enableTime: true,  
		//Displays time picker in 24 hour mode without AM/PM selection when enabled
	time_24hr: true,  
		// Встановлює початкову вибрану дату
	defaultDate: new Date(),
		// регулює крок для введення хвилин
	minuteIncrement: 1, 	
	
		// викликається щоразу під час закриття елемента інтерфейсу, який створює flatpickr
		// тут треба обробляти дату, обрану користувачем
		// Параметр selectedDates - це масив обраних дат
	onClose(selectedDates) { 	

			// Якщо користувач вибрав дату в минулому:
		if (selectedDates[0] < Date.now())
		{
				// виводить попередження з використанням бібліотеки Notiflix
			return Notiflix.Notify.failure('Please choose a date in the future', {
					// налаштування для повідомлення
				width: '320px',
				fontSize: '16px',
				position: 'center-top',
			});	
		}
	
		if (selectedDates[0] >= Date.now())
		{
			btnStart.disabled = false;
			}
	},
};
  
	// Бібліотекe ініціалізується на елементі <input type="text" id="datetime-picker" />
flatpickr("#datetime-picker", options);


function onBtnStartClick() {
		// при запуску таймера кнопка Start стає неактивною
	btnStart.disabled = true;
		// при запуску таймера календар стає доступним для вибору
	inputDateRef.setAttribute('disabled', true);
		// отримуємо вибрану користувачем дату з інпута
	const futureTime = new Date(inputDateRef.value);

		
	const setIntervalId = setInterval(() => {
			// вираховуємо різницю між майбутнім часом і поточним
		const delta = futureTime - Date.now();

			// щоб таймер зупинявся на 00:00:00 і не виводив мінусових значень
		if (delta >= 0) {
		const timeObj = convertMs(delta);
		valueDays.textContent = addLeadingZero(timeObj.days);
		valueHours.textContent = addLeadingZero(timeObj.hours);
		valueMinutes.textContent = addLeadingZero(timeObj.minutes);
		valueSeconds.textContent = addLeadingZero(timeObj.seconds);
		}
				
	}, 1000)
}

	// функцію addLeadingZero(value), яка використовує метод padStart()
	//  і перед рендерингом інтефрейсу форматує значення.
function addLeadingZero(value) {
	return String(value).padStart(2, '0');
}
	// Функція convertMs() повертає об'єкт з розрахованим часом, що залишився до кінцевої дати
	// ms - різниця між кінцевою і поточною датою в мілісекундах.
function convertMs(ms) {
	
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
  
