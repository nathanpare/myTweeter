$(document).ready(function() {
  $(".button").click(function(event) {
    event.preventDefault();
    $(".new-tweet").slideToggle("slow");
  });
});