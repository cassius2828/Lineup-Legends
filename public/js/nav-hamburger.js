const mobileHamburger = document.querySelector("#nav-hamburger");
const mobileBar = document.querySelector("#nav-hamburger .bar");
const mobileNav = document.querySelector("#mobile-nav");

mobileHamburger.addEventListener("click", (e) => {
    mobileBar?.classList.toggle("close");
  mobileNav?.classList.toggle("move");
  mobileNav?.classList.toggle("nav");
  //   dropDown.classList.toggle("hide");
  console.log("toggling");
});
