//logic for character counter
$(document).ready(function() {
  //when the page is loaded define keyboard input event
  $('#tweet-text').on('input', function() {
    const charCounter = $(this).siblings(":first").children(":last");
    const textLength = $(this).val().length;
    charCounter.val(140 - textLength);
    if (textLength > 140) {
      charCounter.css("color", "red");
    } else {
      charCounter.css("color", "#545149");
    }
  });
});