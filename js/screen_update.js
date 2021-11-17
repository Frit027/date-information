function showWarning(str) {
  $("#info").empty();
  $("#warning").html(str);
}

function showInfo(selectedDate) {
  $("#warning").empty();
  $("#info").empty();
  fillTable(selectedDate);
}

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

function updateTime(selectedDate) {
  $("#leftTime").html(`${getTimeLeft(selectedDate)}`);
}