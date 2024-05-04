import { cards } from "./data.js";

const tabsHeader = document.querySelector('.tabs-header');
const tabsHeaderItems = document.querySelectorAll('.tabs-header-item');
const tabsBody = document.querySelector('.card-list');
const tabsBodyItems = document.querySelectorAll('.card-item');
tabsHeaderItems[0].classList.add('active');

// Функция для создания карточек в зависимости от статуса
const createCards = (status) => {
  tabsBody.innerHTML = ''; // Очистить содержимое перед созданием новых карточек

  const filteredCards = cards.filter(card => card.status === status);
  filteredCards.forEach(card => {
    const cardItem = document.createElement('li');
    cardItem.classList.add('card-item');
    cardItem.innerHTML = `
      <a href="/${card.title}" class="card-link">
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
