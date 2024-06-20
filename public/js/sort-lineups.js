const sortLineupActivator = document.querySelector("#sort-lineup-activator");
const sortModal = document.createElement("div");
const section = document.querySelector("section");
const bgTint = document.createElement("div");

const sortModalContent = `<div id="sort-lineups-container-modal" class="">
    <form action="/lineups/explore/sort-lineups" method="GET">
      <label for="sort-lineups">Sort lineups by:</label>
      <select name="sort" id="sort-lineups">
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="highest-rated">Highest Rated</option>
        <option value="lowest-rated">Lowest Rated</option>
        <option value="most-votes">Most Votes</option>
        <option value="least-votes">Least Votes</option>
      </select>
      <button type="submit">Sort</button>
    </form>
  </div>`;

//   add classes and set utitlity hide to correctly toggle the components
bgTint.classList.add("bg-tint");
sortModal.classList.add("sort-modal-container");
bgTint.classList.add("hide");
sortModal.classList.add("hide");
// set the innerHTML of the modal
sortModal.innerHTML = sortModalContent;

sortLineupActivator.addEventListener("click", () => {
  section.appendChild(bgTint);
  section.appendChild(sortModal);

  bgTint?.classList.toggle("hide");
  sortModal?.classList.toggle("hide");

});

