const sideHamburger = document.querySelector("#sidenav");
const bar = document.querySelector("#sidenav .bar");
const sidebar = document.querySelector(".sidebar");
// change names
const lineupContainer = document.querySelector(".lineup-container");
const titleInfo = document.querySelector(".title-info");
const notificationEl = document.getElementById("notifications");
const notiModal = document.getElementById("notifications-modal");
console.log(sideHamburger);

sideHamburger.addEventListener("click", (e) => {
  bar?.classList.toggle("close");
  sidebar?.classList.toggle("move");
  // lineupContainer?.classList.toggle("full");
  // titleInfo?.classList.toggle("full");
  console.log("closed");
  console.log(e.target);
});

notificationEl.addEventListener("click", () => {
  notiModal?.classList.toggle("hide");
});
