// onScroll effects - shrinking header & back-to-top link
window.onscroll = function() {
  var header = document.getElementById('site-header');
  if (window.pageYOffset > 350) {
    header.classList.remove('is-maximized');
  } else {
    header.classList.add('is-maximized');
  }
  var toTop = document.getElementById('js-beam-me-up');
  if (window.pageYOffset > 500) {
    toTop.classList.add('is-visible');
  } else {
    toTop.classList.remove('is-visible');
  }
};
