// intro.js

const INTRO_DURATION = 5500;
const KEY = "edugo_intro_seen";

if (localStorage.getItem(KEY)) {
  window.location.replace("../app/index.html");
}

setTimeout(() => {
  localStorage.setItem(KEY, "true");
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.6s ease";

  setTimeout(() => {
    window.location.replace("../app/index.html");
  }, 600);
}, INTRO_DURATION);
