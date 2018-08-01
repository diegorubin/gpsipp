var Login = function() {
};

Login.prototype.init = function() {
  $('.form-signin').submit(function(event) {
    var credentials = {
      email: document.getElementById('inputEmail').value,
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
    url: '/login',
    data: JSON.stringify(credentials),
    dataType: 'json',
    contentType: 'application/json'
  }).done(function(response){
    _this.createSession(response);
  }).fail(function(data){
    _this.renderError(data.error);
  });
};

