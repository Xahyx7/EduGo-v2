// intro.js
const INTRO_DURATION = 5500;

setTimeout(() => {
  document.body.style.transition = "opacity 0.6s ease";
  document.body.style.opacity = "0";

  setTimeout(() => {
    window.location.replace("./index.html"); // dashboard
  }, 600);

}, INTRO_DURATION);
