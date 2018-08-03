var Login = function() {
};

Login.prototype.init = function() {
  var _this = this;
  $('.form-signin').submit(function(event) {
    var credentials = {
      username: document.getElementById('inputEmail').value,
      password: document.getElementById('inputPassword').value
    };
    _this.login(credentials);
    return false;
  });
};

Login.prototype.login = function(credentials) {
  var _this = this;
  $.ajax({
    method: 'post', 
    url: '/auth',
    data: JSON.stringify(credentials),
    dataType: 'json',
    contentType: 'application/json'
  }).done(function(response){
    _this.createSession(response.access_token);
  }).fail(function(data){
    _this.renderError(data.error);
  });
};

Login.prototype.createSession = function(token) {
  localStorage.setItem('access_token', token);
  window.location.reload();
};

