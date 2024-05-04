import { cards } from "./data.js";
const form = document.querySelector('form.search');
const searchInput = document.getElementById('search-input');
const searchResults = document.querySelector('.search-results');
const cardsTitles = cards.map(card => card.title);
const tabsHeader = document.querySelector('.tabs-header');
const tabsHeaderItems = document.querySelectorAll('.tabs-header-item');
const tabsBody = document.querySelector('.card-list');
const tabsBodyItems = document.querySelectorAll('.card-item');
const searchButton = document.querySelector('.search-box button');
tabsHeaderItems[0].classList.add('active');

searchInput.addEventListener('input', () => {
  const searchText = searchInput.value.trim().toLowerCase();
  if (searchText === '') {
    searchResults.innerHTML = '';
    return;
  }
  const filteredTitles = cardsTitles.filter(title => title.toLowerCase().includes(searchText));
  renderSearchResults(filteredTitles, searchText);
});

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
}

searchButton.addEventListener('click', () => {
  const searchText = searchInput.value.trim().toLowerCase();
  searchResults.innerHTML = '';
  // if (searchText === '') {
  //   // Если searchInput пустой, добавить элемент "Ничего не найдено" в tabsBody
  //   tabsBody.innerHTML = '<li class="no-results">Ничего не найдено</li>';
  //   return;
  // }

  const filteredCards = cards.filter(card => card.title.toLowerCase().includes(searchText));

  if (filteredCards.length === 0 || searchText === '') {
    // Если ни одна карточка не соответствует введенному тексту, отобразить сообщение "Ничего не найдено"
    tabsBody.innerHTML = '<div class="no-results">Ничего не найдено по вашему запросу</div>';
  } else {
    // Создать карточки для найденных результатов
    tabsBody.innerHTML = ''; // Очищаем содержимое перед добавлением новых карточек
    filteredCards.forEach(card => {
      const cardItem = document.createElement('li');
      cardItem.classList.add('card-item');
      cardItem.classList.add('card-item');
      cardItem.innerHTML = `
        <a href="${card.url}" class="card-link">
          <img src="${card.img}" alt="${card.title}-image" class="card-img">
          <span class="card-title">${card.title}</span>
        </a>
      `;
      tabsBody.appendChild(cardItem);
    });
  }
});

// Функция для создания карточек в зависимости от статуса
const createCards = (status) => {
  tabsBody.innerHTML = ''; // Очистить содержимое перед созданием новых карточек

  const filteredCards = cards.filter(card => card.status === status);
  filteredCards.forEach(card => {
    const cardItem = document.createElement('li');
    cardItem.classList.add('card-item');
    cardItem.innerHTML = `
      <a href="${card.url}" class="card-link">
        <img src="${card.img}" alt="${card.title}-image"  class="card-img">
        <span class="card-title">${card.title}</span>
      </a>
    `;
    tabsBody.appendChild(cardItem);
  });
};

// Обработчик события клика на заголовке вкладок
tabsHeader.addEventListener('click', (event) => {
  if (event.target.classList.contains('tabs-header-item')) {
    // Удалить класс active у всех элементов заголовка
    tabsHeaderItems.forEach(item => {
      item.classList.remove('active');
    });
    // Добавить класс active к элементу, на который был клик
    event.target.classList.add('active');

    // Получить статус из класса активного элемента
    const status = event.target.id;
    console.log(event.target.id)

    // Создать карточки для выбранного статуса
    createCards(status);
  }
});

// Создать карточки для текущего активного статуса при загрузке страницы
const initialActiveStatus = document.querySelector('.tabs-header-item.active').id;
createCards(initialActiveStatus);