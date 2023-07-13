//--------------- 달력 부분 ---------------

// 임시 데이터
const data = [
  { date: "2023-07-15", content: "1,000,000" },
  { date: "2023-07-03", content: "2,000,000" },
  { date: "2023-07-14", content: "5,000,000" },
  { date: "2023-07-26", content: "800,000" },
  { date: "2023-07-21", content: "1,500,000" },
];

// 데이터 가공
const calendarList = data.reduce(
  (acc, v) => ({ ...acc, [v.date]: [...(acc[v.date] || []), v.content] }),
  {}
);

// pad method ( 2 -> 02 )
Number.prototype.pad = function () {
  return this > 9 ? this : "0" + this;
};

// 달력 생성
const makeCalendar = (date) => {
  const currentYear = new Date(date).getFullYear();
  const currentMonth = new Date(date).getMonth() + 1;

  const firstDay = new Date(date.setDate(1)).getDay();
  const lastDay = new Date(currentYear, currentMonth, 0).getDate();

  const limitDay = firstDay + lastDay;
  const nextDay = Math.ceil(limitDay / 7) * 7;

  let htmlDummy = "";

  // 한달 전 날짜 표시
  for (let i = 0; i < firstDay; i++) {
    htmlDummy += `<div class="noColor"></div>`;
  }

  /*
    for (let i = 1; i <= lastDay; i++) {    
      htmlDummy += `<div>${i}</div>`;
    }
  */

  // 바뀐 부분
  for (let i = 1; i <= lastDay; i++) {
    const date = `${currentYear}-${currentMonth.pad()}-${i.pad()}`;
    htmlDummy += `
        <div>
          <button id="add-btn"></button>${i}
          <p>${calendarList[date]?.join("</p><p>") || ""}</p>
        </div>
      `;
  }

  for (let i = limitDay; i < nextDay; i++) {
    htmlDummy += `<div class="noColor"></div>`;
  }

  document.querySelector(`.dateBoard`).innerHTML = htmlDummy;
  document.querySelector(
    `.dateTitle`
  ).innerText = `${currentYear}년 ${currentMonth}월`;
};

const date = new Date();

makeCalendar(date);

// 이전달 이동
document.querySelector(`.prevDay`).onclick = () => {
  makeCalendar(new Date(date.setMonth(date.getMonth() - 1)));
};

// 다음달 이동
document.querySelector(`.nextDay`).onclick = () => {
  makeCalendar(new Date(date.setMonth(date.getMonth() + 1)));
};

//--------------- 모달창 부분 ---------------

// 이동
const modal = document.querySelector(".modal");
const btnOpenPopup = document.getElementById("add-btn");
const btnClosePopup = document.getElementById("close-btn");

btnOpenPopup.addEventListener("click", () => {
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
});

btnClosePopup.addEventListener("click", () => {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
});

//지영 추가한 부분
$(document).on("click", "#add-btn", function () {
  // on 이벤트로 변경
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
});
