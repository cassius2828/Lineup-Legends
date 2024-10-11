// Select all remove friend buttons
const removeFriendBtns = document.querySelectorAll(".reject.remove-friend");

// Create a modal for deletion confirmation
const deleteModal = document.createElement("div");

// Select the main section element
const section = document.querySelector("section");

// Get the current user ID from the data attribute
const currentUserId = document
  .querySelector("#friends-num-title")
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
          `/friends/${currentUserId}/search-friends`,
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
        console.error(err);
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
  const friendCount = document.getElementById("friend-count");
  if (friendCount) {
    friendCount.textContent = results.length;
  }
  results.forEach((friend) => {
    const friendCard = document.createElement("div");
    friendCard.classList.add("user-card");
    friendCard.innerHTML = `
            <div class="user-info">
                <div class="user-profile">
                    <img src="<%= user.profileImg || '/images/misc/default-user.jpg' %>" alt="">
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

// Add event listener for each remove friend button to open delete modal
removeFriendBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    console.log("test");
    const friendUsername = btn.getAttribute("data-friend-username");
    const friendId = btn.getAttribute("data-friend-id");
    const currentUserId = btn.getAttribute("data-current-user-id");
    const deleteForm = `
        <form action="/friends/${friendId}?_method=DELETE" method="POST">
            <h2>Are you sure you want to remove ${friendUsername} as your friend?</h2>
            <div>
                <a href="/friends/${currentUserId}">Cancel</a>
                <button type="submit">Delete</button>
            </div>
        </form>
    `;
    showModal(deleteModal, deleteForm, "delete");
  })
);

// Show modal with the specified form content
function showModal(modal, form, selector) {
  if (modal) {
    modal.innerHTML = "";
  }

  modal.innerHTML = form;
  section.appendChild(modal);
  modal.classList.add("edit-modals", selector);
}
