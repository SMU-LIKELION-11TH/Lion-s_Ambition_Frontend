// HTML 요소 상수 선언
const modalScreen = document.querySelector('.modal-screen');
const modalScreenOpenBtns = document.querySelectorAll('.menu-detail-button');
const modalScreenCloseBtn = document.querySelector('.modal-close-button');

// 모달 스크린 토글 함수
function toggleModalScreen() {
  modalScreen.classList.toggle('show');
}

// 모달 스크린 버튼 활성화 (addEventListener)
for (const modalScreenOpenBtn of modalScreenOpenBtns) {
  modalScreenOpenBtn.addEventListener('click', toggleModalScreen);
}
modalScreenCloseBtn.addEventListener('click', toggleModalScreen);

// API 통신 부분 작성 (추후)
fetch('https://jsonplaceholder.typicode.com/users')
