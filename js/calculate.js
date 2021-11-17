const MAX_ADDED_YEAR = 10;
const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;
const MAX_DATE = new Date(new Date().setFullYear(new Date().getFullYear() + MAX_ADDED_YEAR));
let timerId;

$(":input").on("change", function() {
  if (timerId) {
    clearInterval(timerId);
  }

  let selectedDate = new Date($(this).val());
  selectedDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate(),
                          0, 0, 0);

  if (/*isNaN(selectedDate.getTime())*/!$(this).val()) {
    /*console.log($(this).val());
    showWarning("Введена дата некорректного формата.");*/
    $("#warning").empty();
    $("#info").empty();
  } else if (selectedDate <= new Date()) {
    showWarning("Введённая дата уже наступила.");
  } else if (MAX_DATE - selectedDate < 0) {
    showWarning(`Дата не должна быть позже ${MAX_DATE.toLocaleDateString("ru-RU")}.`);
  } else {
    showInfo(selectedDate);
    timerId = setInterval(() => updateTime(selectedDate), 1000);
  }
});

function getNumDayOfYear(date) {
  return Math.floor((date - new Date(date.getFullYear(), 0, 0)) / MILLISECONDS_PER_DAY);
}

function getNumWeekOfYear(date) {
  let n = getNumDayOfYear(date);
  switch (new Date(date.getFullYear(), 0, 1).toLocaleDateString("en-us", { weekday: "long" })) {
    case "Tuesday":
      n += 1;
      break;
    case "Wednesday":
      n += 2;
      break;
    case "Thursday":
      n += 3;
      break;
    case "Friday":
      n += 4;
      break;
    case "Saturday":
      n += 5;
      break;
    case "Sunday":
      n += 6;
  }
  return Math.ceil(n / 7);
}

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
