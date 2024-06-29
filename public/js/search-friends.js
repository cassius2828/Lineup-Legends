

// Get the current user ID from the data attribute
const currentUserId = document
  .querySelector(".user-container")
  .getAttribute("data-current-user-id");

// Cache the original HTML of the user container on page load
document.addEventListener("DOMContentLoaded", (event) => {
  const originalContainer = document.getElementById("user-container");
  if (originalContainer) {
    window.originalContainerHTML = originalContainer.innerHTML;
  } else {
    console.error('Element with ID "user-container" not found on page load.');
  }
});

// Add event listener for the search input to filter friends
document
  .getElementById("search-friends-input")
  .addEventListener("input", async (e) => {
    const query = e.target.value;

    if (query.length > 0) {
      try {
        const response = await fetch(
          `/friends`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              query,
            }),
          }
        );
        const results = await response.json();
        console.log(results, " <-- results");
        displayResults(results);
      } catch (err) {
     
        console.error(err.message);
      }
    } else {
      clearResults();
    }
  });

// Display the filtered friends in the user container
function displayResults(results) {
  const resultsContainer = document.getElementById("user-container");
  if (!resultsContainer) {
    console.error('Element with ID "user-container" not found.');
    return;
  }

  resultsContainer.innerHTML = "";

  results.forEach((friend) => {
    const friendCard = document.createElement("div");
    friendCard.classList.add("user-card");
    friendCard.innerHTML = `
            <div class="user-info">
                <div class="user-profile">
                    <img src="/images/misc/default-user.jpg" alt="">
                </div>
                <h2>${friend.username}</h2>
            </div>
            <div class="edit-friend-btn-container">
                <a href="/profiles/${friend._id}">
                    <button type="button">view profile</button>
                </a>
                <button data-current-user-id="${currentUserId}" 
                        data-friend-username="${friend.username}" 
                        data-friend-id="${friend._id}" 
                        class="reject remove-friend" type="submit">
                    Remove Friend<i style="margin-left: 1rem;" class="fa-solid fa-ban"></i>
                </button>
            </div>
        `;
    resultsContainer.appendChild(friendCard);
  });
}

// Clear the search results and restore the original friend list
function clearResults() {
  const resultsContainer = document.getElementById("user-container");
  if (!resultsContainer) {
    console.error('Element with ID "user-container" not found.');
    return;
  }
  if (window.originalContainerHTML === undefined) {
    console.error("window.originalContainerHTML is undefined.");
    return;
  }
  resultsContainer.innerHTML = window.originalContainerHTML;
  const friendCount = document.getElementById("friend-count");
  if (friendCount) {
    friendCount.textContent = document.querySelectorAll(".user-card").length;
  }
}