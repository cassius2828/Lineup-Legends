document.addEventListener("DOMContentLoaded", (event) => {
    const reorderLineupContainer = document.querySelector(".reorder-lineup-container");
    const reorderLineupForm = document.getElementById("reorder-lineup-form");
    const reorderLineupBtn = document.querySelector(".reorder-lineup-btn");
    const selectEls = document.querySelectorAll("select");
    const reorderLineupSubmitBtn = document.getElementById("reorder-lineup-submit");

    reorderLineupBtn.addEventListener("click", () => {
      reorderLineupContainer.classList.remove("hide");
    });

    selectEls.forEach((select) => {
      select.addEventListener("change", (e) => {
        console.log(e.target.value);
      });
    });

    reorderLineupSubmitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      // check for any duplicates
      const selectedValues = [];
      selectEls.forEach((select) => {
        selectedValues.push(select.value);
      });

      // Sets can only contain UNIQUE values. Compare the size of the Set to the length of the array
      // this will let us know if there are any duplicate values
      const hasDuplicates = new Set(selectedValues).size !== selectedValues.length;

      if (hasDuplicates) {
        alert("Please ensure each player is only listed at ONE position.");
      } else if (selectedValues.includes("")) {
        alert("Please select one player for each position, resulting in 5 selected players.");
      } else {
        reorderLineupForm.submit();
      }
    });

    console.log(reorderLineupForm);
  });