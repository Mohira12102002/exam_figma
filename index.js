"use strict";
/////////////////////////////////////////////////////////////////////////////////////////
// forSlide //
const menuSlide = document.querySelector(".part_features");
const menuSlideH4 = document.querySelectorAll(".part_features h4");
const slide = document.querySelectorAll(".slide");
let slide1 = document.querySelector(".slide__1");
let slide2 = document.querySelector(".slide__2");
let slide3 = document.querySelector(".slide__3");

function nextSlide() {
  if (currentSlide.dataset.num == slide3.dataset.num) currentSlide = slide1;
  else if (currentSlide.dataset.num == slide2.dataset.num)
    currentSlide = slide3;
  else if (currentSlide.dataset.num == slide1.dataset.num)
    currentSlide = slide2;
  goSlide(currentSlide);
}
function prevSlide() {
  if (currentSlide.dataset.num == slide3.dataset.num) currentSlide = slide2;
  else if (currentSlide.dataset.num == slide2.dataset.num)
    currentSlide = slide1;
  else if (currentSlide.dataset.num == slide1.dataset.num)
    currentSlide = slide3;
  goSlide(currentSlide);
}
function goSlide(acticve) {
  let silideNum = acticve.dataset.num;
  menuSlideH4.forEach((event) => {
    if (event.dataset.num == silideNum)
      event.classList.add("h4_Features_active");
    else event.classList.remove("h4_Features_active");
  });
  slide.forEach((e) => {
    e.style.transform = `translateX(-${100 * silideNum}%)`;
  });
}
let currentSlide = document.querySelector(".part_features h4");
menuSlide.addEventListener("click", (e) => {
  e.preventDefault();
  currentSlide = e.target;
  goSlide(currentSlide);
});
// touched
let touchEndX, touchStartX;
const handleTouchStart = (e) => {
  touchStartX = e.touches[0].clientX;
};
const handleTouchMove = (e) => {
  touchEndX = e.touches[0].clientX;
};
const handleTouchEnd = () => {
  const touchDiff = touchStartX - touchEndX;
  if (touchDiff > 50) {
    nextSlide();
  } else if (touchDiff < -50) {
    prevSlide();
  }
};
// touch eventListener
slide.forEach((slide) => {
  slide.addEventListener("touchstart", handleTouchStart);
  slide.addEventListener("touchmove", handleTouchMove);
  slide.addEventListener("touchend", handleTouchEnd);
});

//////////////////////////////////////////////////////////////////////////////////////
// accardion
const accardion = document.querySelector(".accardion");
const accardions = document.querySelectorAll(".accardion .acc");
accardion.addEventListener("click", (e) => {
  let target = e.target.closest(".acc");
  if (!target.classList.contains("acc_active")) {
    accardions.forEach((even) => even.classList.remove("acc_active"));
    target.classList.add("acc_active");
  } else {
    accardions.forEach((even) => even.classList.remove("acc_active"));
  }
});

//////////////////////////////////////////////////////////////////////////////////////
// for input
const input = document.querySelector(".input");
const inputText = input.querySelector("input");
const input1 = input.querySelector(".drop");
const inputT = input.querySelector(".dropT");
const inputError = input.querySelector(".error");
const inputBtn = input.querySelector(".btn");
inputError.style.backgraund = "green !important";
function isEmail(e) {
  e.preventDefault;
  let email = inputText.value;
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    setTimeout(function () {
      input1.classList.remove("hidden");
      inputError.classList.remove("hidden");
    }, 1000);
    input1.classList.add("hidden");
    inputError.classList.add("hidden");
  } else {
    input1.classList.add("hidden");
    inputError.classList.add("hidden");
    inputT.classList.remove("hidden");
    setTimeout(() => {
      inputT.classList.add("hidden");
    }, 1000);
  }
}
inputBtn.addEventListener("click", isEmail);
document.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    isEmail(e);
  }
});

///////////////////////////////////////////////////////////////////////////////////////////
// for burger
const burgerBtn = document.querySelector(".burger");
const sectionBurger = document.querySelector(".for_burger");
const xBtn = sectionBurger.querySelector("h3");
burgerBtn.addEventListener("click", () => {
  sectionBurger.classList.add("show_burger");
});
xBtn.addEventListener("click", () => {
  sectionBurger.classList.remove("show_burger");
});
sectionBurger.addEventListener("click", () => {
  sectionBurger.classList.remove("show_burger");
});

////////////////////////////////////////////////////////////////////////////////////////////////
// for animate sections
const allSections = document.querySelectorAll(".uuu");
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section__hidden");
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  rootMargin: "30px",
  threshold: 0.8,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section__hidden");
});
