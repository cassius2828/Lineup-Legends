document.addEventListener("DOMContentLoaded", (e) => {
  const ratingEls = document.querySelectorAll(".lineup-rating");

  ratingEls.forEach((rating) => {
    const ratingAsNum = Number(rating.innerText);
    console.log(ratingAsNum);

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
    } else {
      rating.style.color = "#6e0005";
    }
  });
});
