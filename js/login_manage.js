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


function logOutPage() {
  $.ajax({
    type: 'GET',
    url: 'http://127.0.0.1:8000/api/v1/logout',
    contentType: 'application/json',
    success: function(data) {
        console.log(data);
        window.location.href = '/login'
    },
    error: function(request, status, error) {
        console.log(status);
    }
  });

}
