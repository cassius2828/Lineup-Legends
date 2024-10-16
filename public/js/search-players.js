const searchInput = document.getElementById("search-players-input");

// Cache the original HTML of the player container on page load
document.addEventListener("DOMContentLoaded", (event) => {
  const originalContainer = document.getElementById("player-container");
  if (originalContainer) {
    window.originalContainerHTML = originalContainer.innerHTML;
  } else {
    console.error('Element with ID "player-container" not found on page load.');
  }
});

searchInput.addEventListener("input", async (e) => {
  const query = e.target.value;
  const url = "/players/search";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  };
  if (query.length > 2) {
    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (!data.ok) {
        throw new Error("Cannot fetch data for player search");
      }
      //   must work on this logic
      if (data.players.length === 0) {
        displayRequestToAddPlayerForm();
      }

      displayResults(data.players); // Assuming your server responds with a JSON object containing a 'players' array
    } catch (err) {
      console.error(err);
      console.log("cannot make request to server");
    }
  } else {
    clearResults();
  }

  // does it everytime so it is included when new ones are built
  const playerImgs = document.querySelectorAll(".player img");

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

// Display the results
function displayResults(players) {
  const resultsContainer = document.getElementById("player-container");
  resultsContainer.innerHTML = ``;

  players.forEach((player) => {
    const playerDiv = document.createElement("div");
    playerDiv.classList.add("player");
    playerDiv.innerHTML = `
      <img
        data-value="${player.value}"
        src="${player.imgUrl}"
        alt="${player.firstName} ${player.lastName}"
      />
      <span class="player-name">
        ${player.firstName} ${player.lastName}
      </span>
    `;
    resultsContainer.appendChild(playerDiv);
  });
}

function displayRequestToAddPlayerForm() {
  console.log("i ran");
  const playerContainer = document.getElementById("player-container");
  playerContainer.innerHTML = ``;
  const form = document.createElement("div");
  form.innerHTML = `
    <h3>Can't find the player you're looking for? Submit a request to add that player into Lineup Legends!</h3>
    <form>
    <label for="player-inquiry">Ask to Add a Player</label>
    <input name="player-inquiry" id="player-inquiry" type="text" required/>
    <button type="submit">Submit</button>
    </form>
    `;
  playerContainer.appendChild(form);
}

function clearResults() {
  const resultsContainer = document.getElementById("player-container");
  if (!resultsContainer) {
    return console.error("window.originalContainerHTML is undefined");
  }

  resultsContainer.innerHTML = window.originalContainerHTML;
}
// toggles visibility of filter by value form
const filterByValBtn = document.getElementById("filter-by-value");
const sortPlayersForm = document.getElementById("sort-players-container");
filterByValBtn.addEventListener("click", (e) => {
  if (sortPlayersForm.style.display === "flex") {
    sortPlayersForm.style.display = "none";
  } else {
    sortPlayersForm.style.display = "flex";
  }
});
