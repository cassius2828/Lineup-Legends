const sideHamburger = document.querySelector("#sidenav");
const sideHamburgerMobile = document.querySelector("#sidenav.mobile");
const bar = document.querySelector("#sidenav .bar");
const sidebar = document.querySelector(".sidebar");
// change names
const lineupContainer = document.querySelector(".lineup-container");
const titleInfo = document.querySelector(".title-info");
const notificationEl = document.getElementById("notifications");
const notiModal = document.getElementById("notifications-modal");
console.log(sideHamburger);

sideHamburger.addEventListener("click", (e) => {
  // if(sidebar.classList.contains('move')){
  //     sideHamburger.style.right = '0'
  // } else {
  //   sideHamburger.style.right = '-14rem'

  // }
  bar?.classList.toggle("close");
  sidebar?.classList.toggle("move");

  // lineupContainer?.classList.toggle("full");
  // titleInfo?.classList.toggle("full");

});
sideHamburgerMobile.addEventListener("click", (e) => {
  // if(sidebar.classList.contains('move')){
  //     sideHamburger.style.right = '0'
  // } else {
  //   sideHamburger.style.right = '-14rem'

  // }
  bar?.classList.toggle("close");
  sidebar?.classList.toggle("move");

  // lineupContainer?.classList.toggle("full");
  // titleInfo?.classList.toggle("full");

});
notificationEl.addEventListener("click", () => {
  notiModal?.classList.toggle("hide");
});
