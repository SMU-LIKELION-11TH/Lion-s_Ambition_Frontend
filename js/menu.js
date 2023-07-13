const modal = document.getElementById("modal-wrap");
const openModalBtn = document.getElementById("add-btn");
const openModalCard = document.getElementById("card-item");
const closeModalBtn = document.getElementById("close-btn");


/* 
$(document).on("click",openModalBtn, function (e) {
  modal.style.display = "block";
  document.body.style.overflow = "hidden"; // 스크롤바 제거
});

$(document).on("click",openModalCard, function (e) {
  console.log("하이요 ㅋㅋ");
  console.log("안녕 : ", e.target);
  modal.style.display = "block";

  if (e.target && e.target.nodeName === "LI") {
    var li = e.target; // 클릭한 li 요소

    // li 요소의 자식 노드에 접근
    var image = li.querySelector("img").getAttribute("src"); // img 요소
    var itemName = li.querySelector("#item-name").innerHTML; // item-name 요소
    var itemPrice = li.querySelector("#card-price").innerHTML; 
    var itemCategory = li.querySelector("#card-category").innerText; 

    // 접근한 DOM 요소에 대한 동작 수행
    // 예: 속성 변경, 클래스 추가 등
    $('img[class=item-img]').attr('src',image);
    $('input[name=pd_name]').attr('value',itemName);
    $('input[name=pd_price]').attr('value',itemPrice);
    $('span[class=dropbtn_content]').text(itemCategory);
  }

  document.body.style.overflow = "hidden"; // 스크롤바 제거
});

//모달창 닫기
$(document).on("click",closeModalBtn, function (e) {
  modal.style.display = "none";
  document.body.style.overflow = "auto"; // 스크롤바 보이기
});
*/

// 모달창 열기
openModalBtn.addEventListener("click", () => {
  modal.style.display = "block";
  document.body.style.overflow = "hidden"; // 스크롤바 제거
});

openModalCard.addEventListener("click", (e) => {
  console.log("하이요 ㅋㅋ");
  console.log("안녕 : ", e.target);
  modal.style.display = "block";

  if (e.target && e.target.nodeName === "LI") {
    var li = e.target; // 클릭한 li 요소

    // li 요소의 자식 노드에 접근
    var image = li.querySelector("img").getAttribute("src"); // img 요소
    var itemName = li.querySelector("#item-name").innerHTML; // item-name 요소
    var itemPrice = li.querySelector("#card-price").innerHTML; 
    var itemCategory = li.querySelector("#card-category").innerHTML; 

    // li 요소의 형제 노드에 접근
    var siblingLi = li.nextElementSibling; // 다음 li 요소

    // 접근한 DOM 요소에 대한 동작 수행
    // 예: 속성 변경, 클래스 추가 등
    $('img[class=item-img]').attr('src',image);
    $('input[name=pd_name]').attr('value',itemName);
    $('input[name=pd_price]').attr('value',itemPrice);
    $('input[name=pd_price]').attr('value',itemPrice);
    $('input[name=pd_category]').attr('value',itemCategory);
  }

  document.body.style.overflow = "hidden"; // 스크롤바 제거
});

// 모달창 닫기
closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
  document.body.style.overflow = "auto"; // 스크롤바 보이기
});


// 이미지 등록
function loadFile(input) {
  var file = input.files[0]; //선택된 파일 가져오기

  var newImage = document.querySelector("img.img");

  //이미지 source 가져오기
  newImage.style.width = "100%";
  newImage.style.height = "100%";
  newImage.src = URL.createObjectURL(file);
  newImage.style.objectFit = "cover";

  //이미지를 image-show div에 추가
  var container = document.getElementById("img-view");
  container.appendChild(newImage);
}

// 이미지 삭제
function delFile() {
  document.querySelector("div#img-view").innerHTML = "";
}

// 상품그룹 드롭다운
dropdown = () => {
  var v = document.querySelector(".dropdown-content");
  var dropbtn = document.querySelector(".dropbtn");
  v.classList.toggle("show");
};

showMenu = (value) => {
  var dropdowns = document.getElementsByClassName("dropdown-content");
  var boxtext = document.getElementById("card-category");
  var i;

  boxtext.innerText = value;
  boxtext.style.color = "#000FFF";

  for (i = 0; i < dropdowns.length; i++) {
    var openDropdown = dropdowns[i];
    if (openDropdown.classList.contains("show")) {
      openDropdown.classList.remove("show");
    }
  }
};

//토글 상태 변경
function is_checked() {
  const checkbox = document.getElementById("toggle-checkbox");
  var carditem = document.getElementById("card-item");

  //checked 속성 체크
  const is_checked = checkbox.checked;

  if (is_checked) {
    document.getElementById("result").innerText = "품절";
  } else {
    document.getElementById("result").innerText = "판매중";
  }
}

// 상세페이지 수정버튼
var editButton = document.getElementById('edit-btn');
var inputElement = document.getElementsByTagName('input');
var formElement = document.getElementsByTagName('form');
var num = 0;

editButton.addEventListener('click', function() {
  if (num === 0 ){
    // disabled 속성 비활성화
    //   formElement.style.pointerEvents = 'auto';
    editButton.style.background = "#FEAC18";
    editButton.value = '저장';
    editButton.setAttribute("type", "submit"); 
    num = 1;
  } else {
    // disabled 속성 활성화
    //formElement.style.pointerEvents = 'none';
    editButton.style.background = "#FFF";
    editButton.value = '수정';
    editButton.setAttribute("type", "button");  
    num = 0;
  }
});
