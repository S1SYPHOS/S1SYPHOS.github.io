function blinker() {
  $('.jquery_blink').fadeOut(500);
  $('.jquery_blink').fadeIn(500);
}

setInterval(blinker, 1100);
