document.addEventListener("DOMContentLoaded", (e) => {
  const ratingEls = document.querySelectorAll(".lineup-rating");
  const playerImgs = document.querySelectorAll(".player img");

  // RATING COLORS
  ratingEls.forEach((rating) => {
    const ratingAsNum = Number(rating.innerText);

    if (ratingAsNum >= 10) {
      rating.style.color = "#99fcff";
    } else if (ratingAsNum >= 9) {
      rating.style.color = "#37d108";
    } else if (ratingAsNum >= 8) {
      rating.style.color = "#d19c08";
    } else if (ratingAsNum >= 7) {
      rating.style.color = "#d15908";
    } else if (ratingAsNum >= 6) {
      rating.style.color = "#d10812";
    } else if (ratingAsNum !== typeof Number) {
      rating.style.color = "#f2f2f2";
    } else {
      rating.style.color = "#6e0005";
    }
  });

  //   PLAYER COLORS
  playerImgs?.forEach((player) => {
    const playerDataValue = Number(player.getAttribute("data-value"));


    if (playerDataValue === 5) {
      player.style.boxShadow = "0px 0px 14px 5px #99fcff";
    } else if (playerDataValue === 4) {
      player.style.boxShadow = "0px 0px 14px 5px #8317e8";
    } else if (playerDataValue === 3) {
      player.style.boxShadow = "0px 0px 14px 5px #e3b920";
    } else if (playerDataValue === 2) {
      player.style.boxShadow = "0px 0px 14px 5px #c0c0c0";
    } else {
      player.style.boxShadow = "0px 0px 14px 5px #804a14";
    }
  });
});
