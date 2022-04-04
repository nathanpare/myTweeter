//form toggle logic (stretch)
$(document).ready(function() {
  //when the document is loaded define the click event
  $(".button").click(function(event) {
    event.preventDefault();
    $(".new-tweet").slideToggle("slow");
  });
});