const profileImg = document.getElementById("profile-img");
const profileMenu = document.getElementById("profile-dropdown");
// let toggleProfileMenu = false
profileImg.addEventListener("click", () => {
  profileMenu.classList.toggle("hide");
  profileMenu.classList.toggle("fade-in-from-top");
});
