// Displays today's day, date and current time.
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

// Event listener for saveBtn click.  Saves the text in local storage.
  function textArea() {
    $(".saveBtn").on("click", function() {
      var text = $(this).siblings(".description").val();
      var time = $(this).parent().attr("id");

      localStorage.setItem(time, text);
    });
  }

// Sets the color of each time block based on the current hour.
  function hourColor() {
    $(".time-block").each(function() {
      var blockHour = parseInt($(this).attr("id"));
      $(this).toggleClass("past", blockHour < currentHour);
      $(this).toggleClass("present", blockHour === currentHour);
      $(this).toggleClass("future", blockHour > currentHour);
    });
  }

// Updates the color of each time block based on the current hour.
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

// Loads the saved text from local storage into the appropriate time blocs.
    $(".time-block").each(function() {
      var time = $(this).attr("id");
      var text = localStorage.getItem(time);
      $(this).find(".description").val(text);
    });

// Event listener for the Clear All Button.  Clears all text and local storage.
    $("#clearBtn").click(function(event) {
      event.preventDefault();
      $("textarea").val("");
      localStorage.clear();
  });

// Call the necessary functions on page load.
  hourColor();
  textArea();
  updateColor();
  setInterval(nowTime);

});