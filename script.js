const openMenuBtn = document.getElementById("open-menu-btn");
const closeMenuBtn = document.getElementById("close-menu-btn");
const navContainer = document.querySelector("nav");

function trapFocus(e) {
  if (e.key !== "Tab") return;

  if (e.shiftKey) {
    if (document.activeElement === firstFocusable) {
      e.preventDefault();
      lastFocusable.focus();
    }
  } else {
    if (document.activeElement === lastFocusable) {
      e.preventDefault();
      firstFocusable.focus();
    }
  }
}

openMenuBtn.addEventListener("click", () => {
  navContainer.hidden = false;
  navContainer.setAttribute("aria-hidden", "false");
  openMenuBtn.setAttribute("aria-expanded", "true");

  focusable = navContainer.querySelectorAll("a, button");
  firstFocusable = focusable[0];
  lastFocusable = focusable[focusable.length - 1];

  firstFocusable.focus();
  document.addEventListener("keydown", trapFocus);
});

closeMenuBtn.addEventListener("click", () => {
  navContainer.hidden = true;
  navContainer.setAttribute("aria-hidden", "true");

  openMenuBtn.setAttribute("aria-expanded", "false");
  openMenuBtn.focus();
});

document.addEventListener("click", (event) => {
  const isClickInsideMenu = navContainer.contains(event.target);
  const btnIsClicked = openMenuBtn.contains(event.target);

  if (!isClickInsideMenu && !btnIsClicked) {
    navContainer.style.display = "none";
  }
});
