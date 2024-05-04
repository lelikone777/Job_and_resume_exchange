// Look for any elements with the class "login":
const selectBox = document.getElementsByClassName("select-box");

for (let i = 0; i < selectBox.length; i++) {
  const selectedElement = selectBox[i].getElementsByTagName("select")[0];

  // For each element, create a new DIV that will act as the selected item:
  const loginSelected = document.createElement("div");
  loginSelected.classList.add("select-selected");
  loginSelected.innerHTML = selectedElement.options[selectedElement.selectedIndex].innerHTML;
  selectBox[i].appendChild(loginSelected);

  // For each element, create a new DIV that will contain the option list:
  const loginSelectItems = document.createElement("div");
  loginSelectItems.classList.add("select-items", "select-hide");

  for (let j = 0; j < selectedElement.length; j++) {
    // For each option in the original select element,
    // create a new DIV that will act as an option item:
    const loginSelectedSingleItem = document.createElement("div");
    loginSelectedSingleItem.innerHTML = selectedElement.options[j].innerHTML;

    loginSelectedSingleItem.addEventListener("click", function (e) {
      // When an item is clicked, update the original select box and the selected item:
      const clickedOption = e.target.innerHTML;
      const selectBox = this.parentNode.parentNode.getElementsByTagName("select")[0];
      const selectedDiv = this.parentNode.previousSibling;


      for (let k = 0; k < selectBox.length; k++) {
        if (selectBox.options[k].innerHTML === clickedOption) {
          selectBox.selectedIndex = k;
          selectedDiv.innerHTML = clickedOption;
          const sameSelected = this.parentNode.getElementsByClassName("same-as-selected");

          for (let s = 0; s < sameSelected.length; s++) {
            sameSelected[s].classList.remove("same-as-selected");
          }

          this.classList.add("same-as-selected");
          break;
        }
      }

      selectedDiv.click();
    });

    loginSelectItems.appendChild(loginSelectedSingleItem);
  }

  selectBox[i].appendChild(loginSelectItems);

  loginSelected.addEventListener("click", function (e) {
    // When the select box is clicked, close any other select boxes and open/close the current select box:
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(element) {
  // A function that will close all select boxes in the document, except the current select box:
  const selectItems = document.getElementsByClassName("select-items");
  const selectSelected = document.getElementsByClassName("select-selected");

  Array.from(selectSelected).forEach((item, index) => {
    if (element !== item) {
      item.classList.remove("select-arrow-active");
    }
  });

  Array.from(selectItems).forEach((item) => {
    if (item.previousSibling !== element) {
      item.classList.add("select-hide");
    }
  });
}

// If the user clicks anywhere outside the select box, then close all select boxes:
document.addEventListener("click", () => {
  closeAllSelect(null);
});