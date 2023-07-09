function setVerificationButtonState(verified) {
  const verificationButton = document.getElementById('verificationButton');

  if (verified) {
    verificationButton.style.backgroundColor = 'blue';
    verificationButton.textContent = '인증 완료';
    verificationButton.disabled = true;
  } else {
    verificationButton.style.backgroundColor = '';
    verificationButton.textContent = '이메일 인증';
    verificationButton.disabled = false;
  }
}


function onsubmitEmail() {
  setVerificationButtonState(true);
  // 이메일 인증 로직을 구현하세요
  // 인증 이메일을 전송하고 인증번호를 확인합니다
  // 이 예시에서는 단순히 인증번호를 콘솔에 출력하는 로직을 작성합니다.
  const number = Math.floor(1000 + Math.random() * 9000);
  console.log("이메일 인증번호:", number);
}

function onclickckEmail() {
  // 이메일 인증번호 확인 로직을 구현하세요
  // 사용자가 입력한 인증번호와 실제 인증번호를 비교합니다
  // 이 예시에서는 단순히 콘솔에 결과를 출력하는 로직을 작성합니다.
  const inputNumber = document.getElementById("number").value;
  const randomNumber = Math.floor(1000 + Math.random() * 9000);
  
  if (inputNumber == randomNumber) {
      console.log("이메일 인증 성공!");
  } else {
      console.log("이메일 인증 실패!");
  }
}

function onsubmitSignup() {
  // 회원가입 정보 가져오기
  const nickname = document.getElementById("nickname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const passwordConfirm = document.getElementById("passwordConfirm").value;

  // 유효성 검사
  if (nickname.trim() === "") {
      alert("닉네임을 입력하세요.");
      return;
  }

  if (email.trim() === "") {
      alert("이메일을 입력하세요.");
      return;
  }

  if (password.trim() === "") {
      alert("비밀번호를 입력하세요.");
      return;
  }

  if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
  }

  // 중복 확인 등 추가 로직 구현

  // 회원가입 처리 로직
  // 여기에 실제 회원가입 처리를 구현하세요
  // 이 예시에서는 단순히 콘솔에 회원가입 정보를 출력하는 로직을 작성합니다.
  console.log("닉네임:", nickname);
  console.log("이메일:", email);
  console.log("비밀번호:", password);
  console.log("비밀번호 확인:", passwordConfirm);

  alert("회원가입이 완료되었습니다!");
  location.href = "login_view.html"; // 회원가입 완료 후 로그인 페이지로 이동
}
