const MAX_ADDED_YEAR = 10;
const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;
const MAX_DATE = new Date(new Date().setFullYear(new Date().getFullYear() + MAX_ADDED_YEAR));
let timerId;

// отслеживание измения поля даты
$(':input').on('change', function() {
  if (timerId) {
    clearInterval(timerId);
  }

  if (!$(this).val()) {
    clearText();
  } else {
    let selectedDate = new Date($(this).val());
    selectedDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(),
                            0, 0, 0);

    if (selectedDate <= new Date()) {
      showWarning('Введённая дата уже наступила.');
    } else if (MAX_DATE - selectedDate < 0) {
      showWarning(`Дата не должна быть позже ${MAX_DATE.toLocaleDateString('ru-RU')}.`);
    } else {
      showInfo(selectedDate);
      timerId = setInterval(() => updateTime(selectedDate), 1000);
    }
  }
});

// получение номера дня в году
function getNumDayOfYear(date) {
  return Math.floor((date - new Date(date.getFullYear(), 0, 0)) / MILLISECONDS_PER_DAY);
}

// получение номера недели в году
function getNumWeekOfYear(date) {
  let n = getNumDayOfYear(date);
  switch (new Date(date.getFullYear(), 0, 1).toLocaleDateString('en-us', { weekday: 'long' })) {
    case 'Tuesday':
      n += 1;
      break;
    case 'Wednesday':
      n += 2;
      break;
    case 'Thursday':
      n += 3;
      break;
    case 'Friday':
      n += 4;
      break;
    case 'Saturday':
      n += 5;
      break;
    case 'Sunday':
      n += 6;
  }
  return Math.ceil(n / 7);
}

/**
 * Для расчета времени до наступления указанной даты используется библиотека moment.js.
 * С помощью функции preciseDiff() можно получить разницу между датами в годах, месяцах,
 * днях, минутах и секундах в виде словаря.
 * Чтобы определить разницу в днях, используется ф-ия diff() из этой же библиотеки.
 * Если расстояние до указанного дня больше 1 года, то оставшиеся дни считаются
 * путем нахождения разности всех дней и количества лет, умноженных на 365.
 */
function getTimeLeft(date) {
  let momentDate = moment(date);
  let momentNow = moment(new Date());

  let dictDiff = moment.preciseDiff(momentNow, momentDate, true);
  let totalDays = momentDate.diff(momentNow, 'days');

  if (dictDiff.years) {
    totalDays = totalDays - dictDiff.years * 365;
  }

  return `${dictDiff.years} лет ${totalDays} дней ${dictDiff.hours} часов 
          ${dictDiff.minutes} минут ${dictDiff.seconds} секунд`
}
