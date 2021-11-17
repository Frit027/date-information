//очистка таблицы и вывод поясняющей строки
function showWarning(str) {
  $("#info").empty();
  $("#warning").html(str);
}

//очистка прежнего текста и заполнение таблицы
function showInfo(selectedDate) {
  clearText();
  fillTable(selectedDate);
}

// заполнение таблицы рассчитанными данными
function fillTable(selectedDate) {
  $("#info").append(`
    <tr>
      <td>Номер дня в году:</td>
      <td>${getNumDayOfYear(selectedDate)}</td>
    </tr>
    <tr>
      <td>Номер недели в году:</td>
      <td>${getNumWeekOfYear(selectedDate)}</td>
    </tr>
    <tr>
      <td>До выбранного дня осталось:</td>
      <td id="leftTime">${getTimeLeft(selectedDate)}</td>
    </tr>
  `);
}

// обновление оставшегося времени до указанной даты
function updateTime(selectedDate) {
  $("#leftTime").html(`${getTimeLeft(selectedDate)}`);
}

// очистка тега <p> и <table>
function clearText() {
  $("#warning").empty();
  $("#info").empty();
}