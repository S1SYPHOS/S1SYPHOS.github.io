jQuery(document).ready(function() {
  // Set initial state of checkbox
  $('.toggle-input').attr('checked', false);
  // Toggle day / night state on click
  $('.toggle-input').change(function() {
    $('html').toggleClass('night');
  });
});
