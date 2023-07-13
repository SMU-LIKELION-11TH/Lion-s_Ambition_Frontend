const orderNumberElement = document.querySelector('.order-info-number');
const orderDateElement = document.querySelector('.order-info-date');
const orderListContainer = document.querySelector('.order-list');
const orderBigNumberElement = document.querySelector('.big-order-number');
const totalPriceElement = document.querySelector('.total-price');

function renderOrderList(orderData) {
  let orderedItemsDomString = '';
  for (let i = 0; i < orderData.order.items.length; i++) {
    orderedItemsDomString += renderOrderedItemDOM(orderData.order.items[i]);
    orderListContainer.innerHTML = orderedItemsDomString;
  }
  orderBigNumberElement.innerHTML = orderData.order.id;
  orderNumberElement.innerHTML = '주문 번호 : ' + orderData.order.id;
  orderDateElement.innerHTML = '주문 날짜 : ' 
  + (orderData.order.created_at).replace('T', ', ');

  const priceResult = orderData.order.total_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  totalPriceElement.innerHTML = '총 결제 금액 : ' + priceResult + '원';
}

function renderOrderedItemDOM(itemData) {
  const price = Number(itemData['unit-price']) * Number(itemData.quantity);
  const priceResult = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `
    <li>
      <p class="menu-title">${itemData.product.name} X ${itemData.quantity}</p>
      <p class="menu-price">${priceResult}</p>
    </li>
  `;
}

function getOrder(orderID) {
  fetch(`http://127.0.0.1:8000/api/v1/order/${orderID}`, {
    method: 'GET',
  })
  .then(async response => {
    const res = await response.json()
    orderGetResponse = res.data; // -> array
    renderOrderList(orderGetResponse);
    console.log(orderGetResponse.order.items);
    localStorage.clear();
  })
  .catch(error => console.error('Error:', error))
}

getOrder(localStorage.getItem('orderID'));