document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector("#nav-hamburger");
const bar = document.querySelector("#nav-hamburger .bar");
const nav = document.querySelector('#mobile-nav')

hamburger.addEventListener("click", (e) => {
  bar.classList.toggle("close");
nav.classList.toggle('move')
nav.classList.toggle('nav')
//   dropDown.classList.toggle("hide");
  console.log("toggling");
});

}
)

