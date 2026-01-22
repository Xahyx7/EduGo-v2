const INTRO_DURATION = 5500;

setTimeout(() => {
  document.body.style.transition = "opacity 0.6s ease";
  document.body.style.opacity = "0";

  setTimeout(() => {
    window.location.href = "./dashboard.html";
  }, 600);

}, INTRO_DURATION);
