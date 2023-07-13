function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

function onsubmitEmail() {
  var email = $('#email').val();
  console.log(email);
  $.ajax({
      type: 'POST',
      url: 'http://127.0.0.1:8000/api/v1/email/validation',
      contentType : 'application/json',
      headers: {
          'X-CSRFToken': getCookie('csrftoken')
      },
      data: JSON.stringify({
        "email": email,
        //백엔드에 보낸 데이터를 여기에 적어야 된다
      }),
      success : function(data){
        console.log(data);
      },
      error: function(request, status, error){
        console.log(status);
      }
  })
  
}
//로그인하는 함수이다
function onsubmitSignup(){
  var email = $('#email').val();
  var password = $('#password').val();
  var name = $('#name').val();
  var validation_code = $('#validation_code').val();
  $.ajax({
      type: 'POST',
      url: 'http://127.0.0.1:8000/api/v1/signup',
      contentType : 'application/json',
      headers: {
          'X-CSRFToken': getCookie('csrftoken')
      },
      data: JSON.stringify({
        "email": email,
        "password": password,
        "name": name,
        "validation-code": validation_code,
        //백엔드에 보낸 데이터를 여기에 적어야 된다
      }),
      success : function(data){
        alert("회원가입이 완료되었습니다")
        window.location.replace('/login')
      },
      error: function(request, status, error){
      }
  })
}


