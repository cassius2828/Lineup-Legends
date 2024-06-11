//////////////////////////////
// Elements
//////////////////////////////
const section = document.getElementById("edit-lineup");

// Modals
const deleteModal = document.createElement("div");
const gambleModal = document.createElement("div");

// Buttons
// come up with better names
const initiateGambleBtn = document.querySelector(".lineup-btn.gamble");
const firstDeleteBtn = document.querySelector(".lineup-btn.delete");


// Players selector
const players = document.querySelectorAll(".player");
let selectedPlayerArr = [];
let playerId = null;

const lineupId = document
  .querySelector(".lineup-card")
  .getAttribute("data-lineup-id");
//////////////////////////////
// Event listener for player selection
//////////////////////////////
players.forEach((player) =>
  player.addEventListener("click", (e) => {
    // Checks to see if the modal is visible before applying the logic
    if (gambleModal.hasChildNodes()) {
      // If there is nothing in the array, add something to the array and style the img
      if (selectedPlayerArr.length === 0) {
        // If it does not have the class, it will be added to the array and style added to img
        player.querySelector("img").classList.add("select-gamble");
        selectedPlayerArr.push(player);
      } else if (selectedPlayerArr.length === 1) {
        // Check if each player has the class, if it does remove it from the array and the style
        players.forEach((p) => {
          if (p.querySelector("img").classList.contains("select-gamble")) {
            p.querySelector("img").classList.remove("select-gamble");
            return selectedPlayerArr.pop();
          } else {
            // Remove player from array
            selectedPlayerArr.pop();
          }
        });
        // Toggle the gamble class and add the player to the array
        player.querySelector("img").classList.toggle("select-gamble");
        selectedPlayerArr.push(player);
      }
      playerId = selectedPlayerArr?.[0]?.getAttribute("data-player-id");
    }
    // re-render with new form value for playerId
    updateGambleForm();
    //    confirm gamble btn
    const confirmPlayerToGambleBtn = document?.getElementById(
      "confirm-player-to-gamble"
    );
    confirmPlayerToGambleBtn.setAttribute("disabled", false);
    confirmPlayerToGambleBtn.classList.remove("disabled-btn");
    // gold gamble btn
    initiateGambleBtn.setAttribute("disabled", true);
    initiateGambleBtn.classList.add("disabled-btn");
  })
);

//////////////////////////////
// Form HTML
//////////////////////////////
const deleteForm = `
<form action="/lineups/${lineupId}/edit?_method=DELETE" method="POST">
  <h2>Are you sure you want to delete this lineup?</h2>
  <div>
    <a href="/lineups/${lineupId}/edit">Cancel</a>
    <button type="submit">Delete</button>
  </div>
</form>
`;

let gambleForm = `
 <h2>Select Player to Gamble</h2>
  <div>
    <a href="/lineups/${lineupId}/edit">Cancel</a>
    <button disabled class="disabled-btn" id="confirm-player-to-gamble"><a href="/lineups/${lineupId}/gamble/${playerId}">Confirm Player</a></button>
    <input type="hidden" value="${playerId}"/>
  </div>
`;
//////////////////////////////
// Update Gamble Form
//////////////////////////////
function updateGambleForm() {
  gambleForm = `
    <h2>Select Player to Gamble</h2>
  <div>
    <a href="/lineups/${lineupId}/edit">Cancel</a>
    <button disabled class="disabled-btn" id="confirm-player-to-gamble"><a href="/lineups/${lineupId}/gamble/${playerId}">Confirm Player</a></button>
    <input type="hidden" value="${playerId}"/>
  </div>
    `;
  showModal(gambleModal, gambleForm, "gamble");
}
//////////////////////////////
// Event listener for gamble modal
//////////////////////////////
initiateGambleBtn.addEventListener("click", (e) => {
  showModal(gambleModal, gambleForm, "gamble");
});

//////////////////////////////
// Event listener for delete modal
//////////////////////////////
firstDeleteBtn.addEventListener("click", (e) => {
  showModal(deleteModal, deleteForm, "delete");
});

//////////////////////////////
// Modal utility function
//////////////////////////////
function showModal(modal, form, selector) {
  if (modal) {
    modal.innerHTML = "";
  }
  console.log(playerId);
  modal.innerHTML = form;
  section.appendChild(modal);
  modal.classList.add("edit-modals", selector);
}

/**
 // * anchor version of button
  <h2>Select Player to Gamble</h2>
  <div>
    <a href="/lineups/${lineupId}/edit">Cancel</a>
    <button disabled class="disabled-btn" id="confirm-player-to-gamble"><a href="/lineups/${lineupId}/gamble/${playerId}">Confirm Player</a></button>
    <input type="hidden" value="${playerId}"/>
  </div>

// * form version
  <form action="/lineups/${lineupId}/gamble/${playerId}" method="GET">
  <h2>Select Player to Gamble</h2>
  <div>
    <a href="/lineups/${lineupId}/edit">Cancel</a>
    <button disabled class="disabled-btn" id="confirm-player-to-gamble" type="submit">Confirm Player</button>
    <input type="hidden" value="${playerId}"/>
  </div>
</form>

 */
