const toggleMenu = document.querySelector("#toggle-menu");
const toggleMenuIcon = toggleMenu.querySelector("img");
const menu = document.querySelector("#menu");
toggleMenu.addEventListener("click", () => {
  menu.classList.toggle("translate-y-[-200%]");
  changeMenuIcon();
});

// close menu click
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((navLink) => {
  navLink.addEventListener("click", () => {
    menu.classList.add("translate-y-[-200%]");
    changeMenuIcon();
  });
});

function changeMenuIcon() {
  const isContainTranslate = menu.classList.contains("translate-y-[-200%]");
  const icon = isContainTranslate ? "icon-menu" : "icon-close";
  toggleMenuIcon.src = `dist/img/${icon}.svg`;
}

// toggle theme
const html = document.querySelector("html");
const toggleTheme = document.querySelector("#toggle-theme");
const toggleThemeIcon = toggleTheme.querySelector("img");
toggleTheme.addEventListener("click", () => {
  html.classList.toggle("dark");
  const isDark = html.classList.contains("dark");
  const themeIcon = isDark ? "light" : "dark";
  toggleThemeIcon.src = `dist/img/icon-${themeIcon}.svg`;
});

// portfolio filter //

let mixer = mixitup(".portfolio-gallery", {
  selectors: {
    target: ".prt-card",
  },
  animation: {
    duration: 500,
  },
});

// portfolio img
const prt_section = document.querySelector(".portfolio");
const zoom_icons = document.querySelectorAll(".zoom-icon");
const modal_overlay = document.querySelector(".modal-overlay");
const images = document.querySelectorAll(".images img");
const prev_btn = document.querySelector(".prev-btn");
const next_btn = document.querySelector(".next-btn");

// modal pop up animation //

let currentIndex = 0;

zoom_icons.forEach((icn, i) =>
  icn.addEventListener("click", () => {
    prt_section.classList.add("open");
    document.body.classList.add("stopSrolling");
    currentIndex = i;
    changeImage(currentIndex);
  })
);

modal_overlay.addEventListener("click", () => {
  prt_section.classList.remove("open");
  document.body.classList.remove("stopScrolling");
});

prev_btn.addEventListener("click", () => {
  if (currentIndex === 0) {
    currentIndex = 2;
  } else {
    currentIndex--;
  }
  changeImage(currentIndex);
});

next_btn.addEventListener("click", () => {
  if (currentIndex === 2) {
    currentIndex = 0;
  } else {
    currentIndex++;
  }
  changeImage(currentIndex);
});

function changeImage(index) {
  images.forEach((img) => img.classList.remove("showImage"));
  images[index].classList.add("showImage");
}

const loader = document.querySelector(".loader");

loader.style.display = "none";

// contact form
const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", function (e) {
  loader.style.display = "block";
  e.preventDefault();

  const url = e.target.action;
  const formData = new FormData(contactForm);

  fetch(url, {
    method: "POST",
    body: formData,
    mode: "no-cors",
  })
    .then(() => {
      //url thank you
      loader.style.display = "none";
      window.location.href = "thankyou.html";
    })
    .catch((e) => alert("Eror occured"));
});
