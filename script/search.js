import { cards } from "./data.js";

const form = document.querySelector('form.search');
const searchInput = document.getElementById('search-input');
const searchResults = document.querySelector('.search-results');
const cardsTitles = cards.map(card => card.title);
const tabsHeader = document.querySelector('.tabs-header');
const tabsHeaderItems = document.querySelectorAll('.tabs-header-item');
const tabsBody = document.querySelector('.card-list');
const searchButton = document.querySelector('.search-box button');
const tags = document.querySelector('.tags');

tabsHeaderItems[0].classList.add('active');
form.addEventListener('submit', (event) => {
  event.preventDefault();
});

function filterCardsByStatusAndSearch(status, searchText) {
  return cards.filter(card => card.status === status && card.title.toLowerCase().includes(searchText));
}

function createCards(status, searchText) {
  tabsBody.innerHTML = '';

  const filteredCards = filterCardsByStatusAndSearch(status, searchText);
  const limit = 4; // Ограничение на количество карточек

  const filteredCardsLimited = filteredCards.slice(0, limit);
  filteredCardsLimited.forEach(card => {
    const cardItem = document.createElement('li');
    cardItem.classList.add('card-item');
    cardItem.innerHTML = `
      <a href="${card.url}" class="card-link hover">
        <img src="${card.img}" alt="${card.title}-image" class="card-img">
        <span class="card-title">${card.title}</span>
      </a>
    `;
    tabsBody.appendChild(cardItem);
  });

  if (tabsBody.children.length === 0) {
    tabsBody.innerHTML = '<div class="no-results">Ничего не найдено по вашему запросу в этой категории</div>';
  }
}

function renderSearchResults(titles, searchText) {
  searchResults.innerHTML = '';

  if (titles.length === 0 || searchText === '') {
    const noResultsItem = document.createElement('li');
    noResultsItem.textContent = 'Результат не найден';
    noResultsItem.classList.add('no-results');
    searchResults.appendChild(noResultsItem);
  } else {
    titles.forEach(title => {
      const resultItem = document.createElement('li');
      const markedTitle = document.createElement('span');

      const regex = new RegExp(searchText, 'gi');
      const highlightedText = title.replace(regex, match => `<b>${match}</b>`);

      markedTitle.innerHTML = highlightedText;
      resultItem.appendChild(markedTitle);
      resultItem.classList.add('result-item');
      resultItem.addEventListener('click', () => {
        searchInput.value = title;
        searchResults.innerHTML = '';
      });
      searchResults.appendChild(resultItem);
    });
  }

  if (tabsBody.children.length === 0) {
    tabsBody.innerHTML = '<div class="no-results">Ничего не найдено по вашему запросу в этой категории</div>';
  }
}

tags.addEventListener('click', (event) => {
  if (event.target.classList.contains('tags-item')) {
    searchInput.value = event.target.textContent;
  }
});

searchButton.addEventListener('click', () => {
  const searchText = searchInput.value.trim().toLowerCase();
  searchResults.innerHTML = '';

  const activeTabId = document.querySelector('.tabs-header-item.active').id;

  const filteredCards = filterCardsByStatusAndSearch(activeTabId, searchText);

  if (filteredCards.length === 0 || searchText === '') {
    tabsBody.innerHTML = '<div class="no-results">Ничего не найдено по вашему запросу в этой категории</div>';
  } else {
    tabsBody.innerHTML = '';
    filteredCards.forEach(card => {
      const cardItem = document.createElement('li');
      cardItem.classList.add('card-item');
      cardItem.innerHTML = `
        <a href="${card.url}" class="card-link hover">
          <img src="${card.img}" alt="${card.title}-image" class="card-img">
          <span class="card-title">${card.title}</span>
        </a>
      `;
      tabsBody.appendChild(cardItem);
    });
  }
});

searchInput.addEventListener('input', () => {
  const searchText = searchInput.value.trim().toLowerCase();
  if (searchText === '') {
    searchResults.innerHTML = '';
    return;
  }
  const filteredTitles = cardsTitles.filter(title => title.toLowerCase().includes(searchText));
  renderSearchResults(filteredTitles, searchText);
});

tabsHeader.addEventListener('click', (event) => {
  if (event.target.classList.contains('tabs-header-item')) {
    tabsHeaderItems.forEach(item => {
      item.classList.remove('active');
    });
    event.target.classList.add('active');

    const status = event.target.id;

    const searchText = searchInput.value.trim().toLowerCase();
    createCards(status, searchText);
  }
});

const initialActiveStatus = document.querySelector('.tabs-header-item.active').id;
createCards(initialActiveStatus, '');
