const sideHamburger = document.querySelector("#sidenav");
const sideHamburgerMobile = document.querySelector("#sidenav.mobile");
const bar = document.querySelector("#sidenav .bar");
const sidebar = document.querySelector(".sidebar");
// change names
const lineupContainer = document.querySelector(".lineup-container");
const titleInfo = document.querySelector(".title-info");
const notificationEl = document.getElementById("notifications");
const notiModal = document.getElementById("notifications-modal");


sideHamburger.addEventListener("click", (e) => {

  bar?.classList.toggle("close");
  sidebar?.classList.toggle("move");


});
sideHamburgerMobile.addEventListener("click", (e) => {


  // }
  bar?.classList.toggle("close");
  sidebar?.classList.toggle("move");


});
notificationEl.addEventListener("click", () => {
  notiModal?.classList.toggle("hide");
});
