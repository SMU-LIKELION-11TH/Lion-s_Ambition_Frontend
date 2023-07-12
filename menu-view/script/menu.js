const modal = document.getElementById("modal-wrap");
const openModalBtn = document.getElementById("add-btn");
const openModalCard = document.getElementById("card-item");
const closeModalBtn = document.getElementById("close-btn");

// 모달창 열기
openModalBtn.addEventListener("click", () => {
  modal.style.display = "block";
  document.body.style.overflow = "hidden"; // 스크롤바 제거
});

openModalCard.addEventListener("click", () => {
  modal.style.display = "block";
  document.body.style.overflow = "hidden"; // 스크롤바 제거
});

// 모달창 닫기
closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
  document.body.style.overflow = "auto"; // 스크롤바 보이기
});


// 이미지 등록
function loadFile(input) {
  var file = input.files[0];	//선택된 파일 가져오기

  //새로운 이미지 div 추가
  var newImage = document.createElement("img");
  newImage.setAttribute("class", 'img');

  //이미지 source 가져오기
  newImage.style.width = "100%";
  newImage.style.height = "100%";
  newImage.src = URL.createObjectURL(file);   
  newImage.style.objectFit = "cover";

  //이미지를 image-show div에 추가
  var container = document.getElementById('img-view');
  container.appendChild(newImage);
};

// 이미지 삭제
function delFile(){
  document.querySelector("div#img-view").innerHTML = '';
}

// 상품그룹 드롭다운
dropdown = () => {
    var v = document.querySelector('.dropdown-content');
    var dropbtn = document.querySelector('.dropbtn')
    v.classList.toggle('show');
  }

showMenu=(value)=>{
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var dropbtn_content = document.querySelector('.dropbtn_content');
    var dropbtn = document.querySelector('.dropbtn');
    var i;

    dropbtn_content.innerText = value;
    dropbtn_content.style.color = '#101010';

    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
 }

//토글 상태 변경
function is_checked() {
  const checkbox = document.getElementById('toggle-checkbox');
  var carditem = document.getElementById('card-item');

  //checked 속성 체크
  const is_checked = checkbox.checked;

  if(is_checked){
    document.getElementById('result').innerText = "품절";
  }else{
    document.getElementById('result').innerText = "판매중";
  }
}

//수정버튼 클릭 후 폼 클릭 가능
const editbtn = document.getElementById("edit-btn");
const submitbtn = document.getElementById("submit-btn");

editbtn.addEventListener("click", () => {
  editbtn.style.display = "none";
  submitbtn.style.display = "block";
});

function changeEdit(){
  editbtn.style.display = "block";
  submitbtn.style.display = "none";
}