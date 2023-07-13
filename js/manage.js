/**
 * 화면에 표시할 년도, 월
 */
var calendarYear = 1999;
var calendarMonth = 1;

const modal = document.querySelector(".modal");

const mockData = {
  "data": {
    "orders": [
      {
        "id": 1,
        "status": {
          "id": 1,
          "name": "접수 전"
        },
        "items": [
          {
            "product": {
              "id": 1,
              "name": "RDS잘되고있나확인하는메뉴"
            },
            "unit-price": 1000,
            "quantity": 2
          },
          {
            "product": {
              "id": 2,
              "name": "햄버거"
            },
            "unit-price": 3000,
            "quantity": 1
          },
          {
            "product": {
              "id": 3,
              "name": "코카콜라"
            },
            "unit-price": 1500,
            "quantity": 2
          }
        ],
        "total_price": 8000,
        "created_at": "2023-07-13T13:17:22.538Z",
        "updated_at": "2023-07-13T13:17:22.538Z"
      },
      {
        "id": 2,
        "status": {
          "id": 1,
          "name": "접수 전"
        },
        "items": [
          {
            "product": {
              "id": 1,
              "name": "RDS잘되고있나확인하는메뉴"
            },
            "unit-price": 1000,
            "quantity": 2
          },
          {
            "product": {
              "id": 2,
              "name": "햄버거"
            },
            "unit-price": 3000,
            "quantity": 1
          },
          {
            "product": {
              "id": 3,
              "name": "코카콜라"
            },
            "unit-price": 1500,
            "quantity": 2
          }
        ],
        "total_price": 8000,
        "created_at": "2023-07-13T13:17:29.705Z",
        "updated_at": "2023-07-13T13:17:29.705Z"
      },
      {
        "id": 3,
        "status": {
          "id": 1,
          "name": "접수 전"
        },
        "items": [
          {
            "product": {
              "id": 1,
              "name": "RDS잘되고있나확인하는메뉴"
            },
            "unit-price": 1000,
            "quantity": 2
          },
          {
            "product": {
              "id": 2,
              "name": "햄버거"
            },
            "unit-price": 3000,
            "quantity": 1
          },
          {
            "product": {
              "id": 3,
              "name": "코카콜라"
            },
            "unit-price": 1500,
            "quantity": 2
          }
        ],
        "total_price": 8000,
        "created_at": "2023-07-13T13:17:36.350Z",
        "updated_at": "2023-07-13T13:17:36.350Z"
      },
      {
        "id": 4,
        "status": {
          "id": 1,
          "name": "접수 전"
        },
        "items": [
          {
            "product": {
              "id": 1,
              "name": "RDS잘되고있나확인하는메뉴"
            },
            "unit-price": 1000,
            "quantity": 99
          },
          {
            "product": {
              "id": 1,
              "name": "RDS잘되고있나확인하는메뉴"
            },
            "unit-price": 1000,
            "quantity": 9
          },
          {
            "product": {
              "id": 3,
              "name": "코카콜라"
            },
            "unit-price": 1500,
            "quantity": 1
          }
        ],
        "total_price": 109500,
        "created_at": "2023-07-13T13:34:39.596Z",
        "updated_at": "2023-07-13T13:34:39.597Z"
      }
    ]
  }
};


function initCalendar() {
  const now = new Date();

  calendarYear = now.getFullYear();
  calendarMonth = now.getMonth() + 1;

  makeCalendarDOM();
}

function selectPrevMonth() {
  calendarMonth = ((calendarMonth + 10) % 12) + 1;
  if (calendarMonth == 12) {
    calendarYear -= 1;
  }
}

function selectNextMonth() {
  calendarMonth = (calendarMonth % 12) + 1;
  if (calendarMonth == 1) {
    calendarYear += 1;
  }
}

function renderDate(year, month, date) {
  return `${year}-${month.toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}`;
}

function makeCalendarDOM() {
  const firstDay = new Date(calendarYear, calendarMonth-1, 1).getDay(); 
  const lastDay = new Date(calendarYear, calendarMonth, 0).getDate();
  const limitDay = firstDay + lastDay;
  const nextDay = Math.ceil(limitDay / 7) * 7;

  let html = "";

  // 한달 전 날짜 표시
  for (let i = 0; i < firstDay; i++) {
    html += `<div class="noColor"></div>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    const date = renderDate(calendarYear, calendarMonth, i);
    html += `
        <div>
          <button class="add-btn ${i}"></button></button><p>${i}</p>
        </div>
      `;
  }

  for (let i = limitDay; i < nextDay; i++) {
    html += `<div class="noColor"></div>`;
  }

  // html 삽입
  document.querySelector(`.dateBoard`).innerHTML = html;
  document.querySelector(`.dateTitle`).innerText = `${calendarYear}년 ${calendarMonth}월`;
}

function closeModal() {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

function openModal(event) {
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
// api 호출 밑에 func에서 불러와버려 -> year , month -> []

  var calendarDate = Number.parseInt(event.target.classList[1]);

  // filtering(년/월/일 -> 일자만 꺼내와) 후 showSalesInfoOnModal에 인자를 넘겨줘서 mockData 대체
  //data().data.orders.filter(order => )

  showSalesInfoOnModal(calendarDate);
}

function showSalesInfoOnModal(calendarDate) {
  const data = response_list; // mockData 리스트에 있던 데이터를 response로 받아온 리스트를 새롭게 변수 선언한 response_list
  const orderOfTheDay = data.data.orders.filter(order => isOrderCreatedAt(order, calendarYear, calendarMonth, calendarDate));
  document.querySelector('.modal .today-date').innerText = `날짜 ${renderDate(calendarYear, calendarMonth, calendarDate)}`;
  var html = '';
  for (const order of orderOfTheDay) {
    for (const item of order.items) {
      html += `
        <div class="product-info">
          <div class="flex1">
            <p class="today-product">${item.product.name}</p>
            <p class="multi-icon">x</p>
            <p class="today-count">${item.quantity}</p>
          </div>
          <p class="today-price">${item["unit-price"] * item.quantity}</p>
        </div>
      `;
    }
  }
  document.getElementById('today-items').innerHTML = html;
  }

function isOrderCreatedAt(order, year, month, date) {
  const orderDate = new Date(order.created_at);
  return (orderDate.getFullYear() == year)
    && ((orderDate.getMonth()+1) == month)
    && (orderDate.getDate() == date);
}

/**
 * 이벤트 리스너 추가하는 부분
 */


document.querySelector(`.prevDay`).onclick = () => { 
  selectPrevMonth();
  makeCalendarDOM();
};
document.querySelector(`.nextDay`).onclick = () => {
  selectNextMonth();
  makeCalendarDOM();
};
document.getElementById("close-btn").addEventListener("click", closeModal);
$(document).on("click", ".add-btn", openModal);

//

initCalendar();

var response_list ={};

function data() {
  fetch('http://127.0.0.1:8000/api/v1/order?status=3', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then(async (response) => {
    if (response.status === 401) {
      throw new Error('401 에러 발생: Unauthorized');
    } else if (response.status === 404) {
      throw new Error('404 에러 발생: Not Found');
    }
    
    response_list = await response.json();
    console.log('SUCCESS', response, response_list);
  })
  .catch((error) => console.log('ERROR', error));
}

window.onload = () => data();