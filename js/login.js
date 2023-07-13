//로그인하는 함수이다

function onclickLogin() {
  
    fetch('http://127.0.0.1:8000/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: $('#email').val(),
        password: $('#password').val(),
      }),
    })
    .then((response) => {
      if (response.status === 400) {
        throw new Error('400 에러 발생: Bad Request');
      } else if (response.status === 401) {
        throw new Error('401 에러 발생: Unauthorized');
      } else if (response.status === 429) {
        throw new Error('429 에러 발생: Too Many Requests');
      }
      console.log('SUCCESS', response);
      alert("로그인이 완료되었습니다")
      window.location.replace('/manage')
    })
    .catch((error) => console.log('ERROR', error));

}