    // main board
    var data;
    $.ajax({
        /* 요청 시작 부분 */
        url: "http://127.0.0.1:8000/api/v1/product", //주소
        type: "GET", //전송 타입
        async: true, //비동기 여부
        dataType: "json", //응답받을 데이터 타입 (XML,JSON,TEXT,HTML)

        /* 응답 확인 부분 */
        success: function (response) {
            data = response;
            console.log("success",data);
            renderHTML(data.data.products);
        },

        /* 에러 확인 부분 */
        error: function (xhr) {
        },

        /* 완료 확인 부분 */
        complete: function (data, textStatus) {
            renderHTML(data);
        }
    });

    console.log("data : ", data);


    // 정렬 버튼 클릭 이벤트 핸들러
    $("#nav-btn .nav-link").on("click", function() {
      $('#card-list').empty();

      var productList = data.data.products;
      sortKey = $(this).text(); // 정렬 기준 텍스트 가져오기

      if (sortKey === "전체") {
        // 전체 상품 보기
        renderHTML(productList);
      } else if (sortKey === "판매중") {
        // 판매중인 상품 보기
        var onSaleList = productList.filter(function(product) {
          return !product.is_soldout;
        });
        renderHTML(onSaleList);
      } else if (sortKey === "품절") {
        // 품절된 상품 보기
        var soldOutList = productList.filter(function(product) {
          return product.is_soldout;
        });
        renderHTML(soldOutList);
      }
    });

    // HTML 렌더링 함수
    function renderHTML(data) {
        var productList = data;
        console.log(productList)
        var productContainer = document.getElementById('card-list');

        for (var i = 0; i < productList.length; i++) {
            var product = productList[i];

            // 상품 정보 표시
            var productDiv = document.createElement('li');
            productDiv.setAttribute("class", "card-item");
            productDiv.innerHTML = `
                <img id=card-img src="${product.image_url}" alt="${product.name}" />
                <span class="item-name">${product.name}</span>      
                <span class="card-id" style = "display: none;">${product.id}</span>      
                <span class="card-price">${product.price}</span> 
                <span class="card-category">${product.category.name}</span>
                <span class="card-soldout">${product.is_soldout}</span> 
            `;
                // 배경색 변경
            if (product.is_soldout) {
            productDiv.style.backgroundColor = "#101010";

            }
            // 상품 컨테이너에 추가
            productContainer.appendChild(productDiv);
        }
        $(".card-item").on("click", showModal);
    }

const modal = $("#modal-wrap");
const openModalBtn = $("#add-btn");
const closeModalBtn = $("#close-btn");

// 모달창 열기
openModalBtn.on("click", () => {
  modal.css("display", "block");
  $("body").css("overflow", "hidden"); // 스크롤바 제거
});

function showModal(e) {
  modal.css("display", "block");
  $("body").css("overflow", "hidden"); // 스크롤바 제거

  if ($(this).is("li")) {
    const li = $(this);
    const image = li.find("img").attr("src");
    const itemName = li.find(".item-name").text();
    const itemPrice = li.find(".card-price").text();
    const itemCategory = li.find(".card-category").text();
    const itemsoldout = li.find(".card-soldout").text();
    const itemid = li.find(".card-id").text();

    $(".item-img").attr("src", image);
    $("input[name=pd_name]").val(itemName);
    $("input[name=pd_price]").val(itemPrice);
    $("input[name=pd_category]").val(itemCategory);

       // 상품 ID 저장
       $("#modal-wrap").data("productId", itemid);
  }
}

// 모달창 닫기
closeModalBtn.on("click", () => {
  modal.css("display", "none");
  $("body").css("overflow", "auto"); // 스크롤바 보이기
  $(".item-img").attr("src", ""); // 이미지의 src를 초기화
  $("input[name=pd_name]").val(""); // 상품명 입력 필드 초기화
  $("input[name=pd_price]").val(""); // 가격 입력 필드 초기화
  $("input[name=pd_category]").val("상품그룹 선택"); // 상품그룹 선택 필드 초기화
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
  var dropbtn_content = document.querySelector(".dropbtn_content");
  var dropbtn = document.querySelector(".dropbtn");
  var i;

  dropbtn.value = value;
  dropbtn.style.color = "#101010";

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

  //checked 속성 체크
  var is_checked = checkbox.checked;

  if (is_checked) {
    document.getElementById("result").innerText = "품절";
  } else {
    document.getElementById("result").innerText = "판매중";
  }
}


// 수정 버튼 클릭 시 저장 버튼 클릭 가능
var isEditMode = false;

function editClick() {
    var editBtn = $("#edit-btn");
    var productId = $("#modal-wrap").data("productId");
    console.log(productId);

    if (isEditMode) {
        // 저장 버튼 클릭 시
        var pdName = $("input[name=pd_name]").val();
        var pdPrice = $("input[name=pd_price]").val();
        var pdCategory = $("input[name=pd_category]").val();
        var pdSoldout = $("#toggle-checkbox").is(":checked");

        // 데이터 유효성 검사
        if (pdName.trim() === "" || pdPrice.trim() === "" || pdCategory.trim() === "") {
            alert("입력된 데이터를 모두 입력해주세요.");
            return;
        }

        // AJAX 요청 보내기
        $.ajax({
          url: "http://127.0.0.1:8000/api/v1/product/" + productId, // 수정할 상품의 ID를 URL에 포함
            type: "PATCH",
            dataType: "json",
            headers: {
            },
            data: {
                name: pdName,
                price: pdPrice,
                'category-id': pdCategory,
                soldout: pdSoldout
            },
            success: function (response) {
                // 성공적으로 저장되었을 때 처리 로직 작성
                console.log("데이터 저장 성공");
                console.log(response);
                // 추가적인 작업이 필요하다면 여기에 작성

                // 버튼 상태 변경
                editBtn.removeClass("save-mode");
                editBtn.css("background-color", "#FFF");
                editBtn.val("수정");

                isEditMode = false;
            },
            error: function (xhr, textStatus, errorThrown) {
                // 저장 실패 시 처리 로직 작성
                console.log("데이터 저장 실패");
                // 추가적인 작업이 필요하다면 여기에 작성
            }
        });
    } else {
        // 수정 버튼 클릭 시
        editBtn.addClass("save-mode");
        editBtn.css("background-color", "#FEAC18");
        editBtn.val("저장");

        isEditMode = true;
    }
}

// 저장 버튼 클릭 이벤트 핸들러
$("#edit-btn").on("click", function() {
  // 저장 버튼 클릭 시 실행될 코드
  var pdName = $("input[name=pd_name]").val();
  var pdPrice = $("input[name=pd_price]").val();
  var pdCategory = $("input[name=pd_category]").val();
  var pdSoldout = $("#toggle-checkbox").is(":checked");

  // 데이터 유효성 검사
  if (pdName.trim() === "" || pdPrice.trim() === "" || pdCategory.trim() === "") {
    alert("입력된 데이터를 모두 입력해주세요.");
    return;
  }
  pdCategory = {
    '버거': 1,
    '사이드': 2,
    '음료': 3
  }[pdCategory];

  // AJAX 요청 보내기
  $.ajax({
    url: "http://127.0.0.1:8000/api/v1/product",
    type: "POST",
    dataType: "json",
    headers: {
      Authorization: "Bearer fe5f80f77d5fa3beca038a248ff027d0445342fe28"
    },
    data: {
      'category-id': pdCategory,
      name: pdName,
      price: pdPrice,
      'image-url': "https://i.namu.wiki/i/VZTq6rgkfjhWXOIGqAuFIDaxtyLqE0nArz6pqt1V5vJFbjcxuMa27F3o-NWbAEAJrump_qcfPHkHisZoUKsLC8L_sPdwQ9nQVd0MxaV70OwLMY922On_l6qLR7azyMxP5bl8yHVGBxvwRg435C_HZw.webp",
      soldout: pdSoldout,
    },
    success: function(response) {
      console.log("데이터 저장 성공");
      console.log(response);

      // 추가 작업이 필요한 경우 여기에 작성

      // 저장 버튼 상태 변경
      $(this).removeClass("save-mode");
      $(this).css("background-color", "#FFF");
      $(this).val("수정");

      isEditMode = false;
    },
    error: function(xhr, textStatus, errorThrown) {
      console.log("데이터 저장 실패");
      console.log(xhr.responseText);
      // 실패 처리에 대한 추가 작업을 여기에 작성
    }
  });
});

// 상품 추가 버튼 클릭 이벤트 핸들러
$("#add-btn").on("click", function() {
  // 저장 버튼 활성화
  $("#edit-btn").addClass("save-mode");
  $("#edit-btn").css("background-color", "#FEAC18");
  $("#edit-btn").val("저장");

  isEditMode = true;
});


