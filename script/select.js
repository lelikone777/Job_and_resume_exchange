import { selectLogin } from "./data.js";
const selectBox = document.querySelector(".select-box");
const loginSelected = document.createElement("div");
loginSelected.classList.add("select-selected");

function createSelectItem(parent, logo, title, child) {
  const selectItem = document.createElement("div");
  selectItem.classList.add("select-item");
  selectItem.innerHTML = `<span class="select-item-image"><img src="${logo}" alt="${title}-image"></span><span class="select-item-text">${title}</span>`;

  // Проверяем, является ли родитель "select-selected" или содержит класс "select-selected":
  const isParentSelectSelected = parent.classList.contains("select-selected") || parent.parentElement.classList.contains("select-selected");

  if (isParentSelectSelected) {
    // Если родитель "select-selected" или содержит "select-selected", то удаляем все существующие "select-item":
    const existingSelectItems = parent.querySelectorAll(".select-item");
    existingSelectItems.forEach(item => {
      item.remove();
    });

    // Удаляем все существующие arrowImg:
    const existingArrowImgs = parent.querySelectorAll(".select-arrow");
    existingArrowImgs.forEach(arrowImg => {
      arrowImg.remove();
    });

    const arrowImg = document.createElement("img");
    arrowImg.classList.add("select-arrow");
    arrowImg.src = "./img/arrow.svg";
    parent.append(arrowImg);
  }
  parent.prepend(selectItem);
}

createSelectItem(loginSelected, selectLogin[0].icon, selectLogin[0].title);

selectBox.appendChild(loginSelected);

const loginSelectItems = document.createElement("div");
loginSelectItems.classList.add("select-items", "select-hide");

selectLogin.forEach(item => {
  const loginSelectedSingleItem = document.createElement("div");
  loginSelectedSingleItem.classList.add("select-item");
  loginSelectedSingleItem.innerHTML = `<span class="select-item-image"><img src="${item.icon}" alt="${item.title}-image"></span><span class="select-item-text">${item.title}</span>`;
  loginSelectedSingleItem.addEventListener("click", function(e) {
    // const clickedOption = `<span class="select-item-image"><img src="${item.icon}" alt="${item.title}-image"></span><span class="select-text">${item.title}</span>`;
    const selectedDiv = this.parentNode.previousSibling;
    // selectedDiv.innerHTML = clickedOption;
    createSelectItem(selectedDiv, item.icon, item.title);
    const sameSelected = this.parentNode.getElementsByClassName("same-as-selected");
    for (let s = 0; s < sameSelected.length; s++) {
      sameSelected[s].classList.remove("same-as-selected");
    }
    this.classList.add("same-as-selected");
  });
  loginSelectItems.appendChild(loginSelectedSingleItem);
});

loginSelectItems.firstChild.classList.add("same-as-selected");

selectBox.appendChild(loginSelectItems);

loginSelected.addEventListener("click", function(e) {
  e.stopPropagation();
  closeAllSelect(this);
  this.nextSibling.classList.toggle("select-hide");
  this.classList.toggle("select-arrow-active");
  const arrowImg = this.querySelector(".select-arrow");
  if (!loginSelectItems.classList.contains("select-hide")) {
    arrowImg.style.transform = "rotate(180deg)";
    arrowImg.style.transition = "transform 0.3s ease-in-out";
  } else {
    arrowImg.style.transform = "rotate(0deg)";
  }
});

function closeAllSelect(element) {
  const selectItems = document.getElementsByClassName("select-items");
  const selectSelected = document.getElementsByClassName("select-selected");

  Array.from(selectItems).forEach((item) => {
    if (item.previousSibling !== element) {
      item.classList.add("select-hide");
    }
  });
}
document.addEventListener("click", () => {
  closeAllSelect(null);
});




