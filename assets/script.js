// Displays today's date, date and time.
function nowTime() {
  var dateElement = $("#date");
  var timeElement = $("#time");
  var currentDate = dayjs().format("dddd, MMMM D, YYYY");
  var currentTime = dayjs().format("hh:mm:ss a");
  dateElement.text(currentDate);
  timeElement.text(currentTime);
}

$(function () {
  var currentHour = dayjs().format("H");
// saveBtn click listener.  Save in local storage.
  function textArea() {
    $(".saveBtn").on("click", function() {
      var text = $(this).siblings(".description").val();
      var time = $(this).parent().attr("id");

      localStorage.setItem(time, text);
    });
  }

  function hourColor() {
    $(".time-block").each(function() {
      var blockHour = parseInt($(this).attr("id"));
      $(this).toggleClass("past", blockHour < currentHour);
      $(this).toggleClass("present", blockHour === currentHour);
      $(this).toggleClass("future", blockHour > currentHour);
    });
  }

  function updateColor() {
    $(".time-block").each(function() {
      var blockHour = parseInt($(this).attr("id"));
      if (blockHour == currentHour) {
        $(this).removeClass("past future").addClass("present");
      } else if (blockHour < currentHour) {
        $(this).removeClass("future present").addClass("past");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }

// function for time block and local storage.
    $(".time-block").each(function() {
      var time = $(this).attr("id");
      var text = localStorage.getItem(time);
      $(this).find(".description").val(text);
    });

// function for Clear All button.
    $("#clearBtn").click(function(event) {
      event.preventDefault();
      $("textarea").val("");
      localStorage.clear();
  });

  hourColor();
  textArea();
  updateColor();
  setInterval(nowTime);

});