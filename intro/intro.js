// intro/intro.js
// Always show intro, then go to MAIN app

const INTRO_DURATION = 5500;

setTimeout(() => {
  document.body.style.transition = "opacity 0.6s ease";
  document.body.style.opacity = "0";

  setTimeout(() => {
    // IMPORTANT: go to ROOT index.html
    window.location.replace("/");
  }, 600);

}, INTRO_DURATION);
