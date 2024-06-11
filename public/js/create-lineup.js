////////////////
// Variables
////////////////
const players = document.querySelectorAll(".player-container");
const selectedCells = document.querySelectorAll(".selected-cell");
const removePlayerBtns = document.querySelectorAll(".remove-player-btn");
const moneyLeft = document.querySelector("#money-left");
let moneyLeftValue = Number(moneyLeft.getAttribute("data-value"));

/////////////////////////
// Function Definitions
/////////////////////////

// Function to submit the lineup form
function confirmLineup() {
  document.getElementById("lineupForm").submit();
  //  this form creates lineup then redirects user to reorder page
  document.getElementById("lineupFormReorder").submit();
}

/////////////////////////
// Event Listeners
/////////////////////////

// Add click event listener to each player container
players.forEach((player) => {
  player.addEventListener("click", function (e) {
    addPlayerToLineupRow(this);
  });
});

////////////////////////////////
// Add Player to Lineup Row
////////////////////////////////
function addPlayerToLineupRow(player) {
  // Get value of the player img src
  const imgEl = player.querySelector(".cell > img");
  const playerImg = imgEl.src;
  const playerId = imgEl.getAttribute("data-player-id");

  // Clone player to add to potential lineup
  const clonedPlayer = player.cloneNode(true);

  for (const cell of selectedCells) {
    // Find the value of the img in the lineup squares
    const selectedCellImg = cell.querySelector(
      ".player-container > .cell > img"
    )?.src;

    // Early return if one of the image src is found in the lineup to submit
    if (selectedCellImg === playerImg) return;

    // If the space is empty then proceed
    if (cell.innerHTML === "") {
      // update the amount of money-left
      const playerDataValue = player
        .querySelector(".cell img")
        .getAttribute("data-value");

      //   prevents overdrawing on money left
      if (moneyLeftValue - Number(playerDataValue) < 0) return;
      // updates the money left
      moneyLeftValue -= Number(playerDataValue);
      moneyLeft.setAttribute("data-value", moneyLeftValue);
      // style based on money left
      updateMoneyLeftUI();

      // Creating the remove player button
      const removePlayer = document.createElement("div");
      removePlayer.innerHTML = "<span>x</span>";
      cell.appendChild(removePlayer);
      removePlayer.classList.add("remove-player-btn");

      // Create the hidden inputs for form submission | we have two forms, one allows you to edit your lineup after creation
      const hiddenInput1 = document.createElement("input");
      hiddenInput1.value = playerId;
      hiddenInput1.type = "hidden";
      hiddenInput1.name = "playerIds[]";

      const hiddenInput2 = document.createElement("input");
      hiddenInput2.value = playerId;
      hiddenInput2.type = "hidden";
      hiddenInput2.name = "playerIds[]";

      // Add event listener to btn as it is created
      removePlayer.addEventListener("click", (e) => {
        e.stopPropagation();

        removePlayerFromLineupRow(player, cell, hiddenInput1, hiddenInput2);
      });

      cell.style.border = "none";

      // Append a clone to preserve the player on the original grid
      cell.appendChild(clonedPlayer);

      // Set filters to indicate to user that the player has been selected
      player.classList.add("dim-player");

      document.getElementById("lineupForm").appendChild(hiddenInput1);
      //  this form creates lineup then redirects user to reorder page
      document.getElementById("lineupFormReorder").appendChild(hiddenInput2);

      console.log(document.getElementById("lineupForm"));
      console.log(document.getElementById("lineupFormReorder"));
      break;
    }
  }
}

////////////////////////////////
// Remove Player from Lineup Row
////////////////////////////////
function removePlayerFromLineupRow(
  originalPlayer,
  cell,
  hiddenInput1,
  hiddenInput2
) {
  cell.innerHTML = "";
  originalPlayer.classList.remove("dim-player");
  hiddenInput1.remove();
  hiddenInput2.remove();

  const playerDataValue = originalPlayer
    .querySelector(".cell img")
    .getAttribute("data-value");

  moneyLeftValue += Number(playerDataValue);
  moneyLeft.setAttribute("data-value", moneyLeftValue);
  updateMoneyLeftUI();
}

////////////////////////////////////////////////////////////////
// updates color and value displayed in moneyLeft | //! UI only
////////////////////////////////////////////////////////////////
function updateMoneyLeftUI() {
  // style based on money left
  if (moneyLeftValue > 5) {
    moneyLeft.style.color = "#f2f2f2";
    console.log("gold");
  }
  if (moneyLeftValue <= 5) {
    moneyLeft.style.color = "gold";
    console.log("gold");
  }
  if (moneyLeftValue <= 0) {
    moneyLeft.style.color = "red";
  }
  moneyLeft.textContent = `$${moneyLeftValue}`;
}

////////////////////////////////
// Confirm Lineup Event Listener
////////////////////////////////
document
  .querySelector(".confirm-button")
  .addEventListener("click", confirmLineup);
