var User = function() {
};

User.prototype.init = function(application) {
  var _this = this;
  _this.application = application;
  
  if (_this.application.isLogged()) {
    _this.loadUsers();
  } else {
    _this.initForm();
  }
};

User.prototype.initForm = function() {
  $('.form-user').submit(function(event) {
    var user = {
      name: document.getElementById('inputName').value,
      email: document.getElementById('inputEmail').value,
      'email_confirmation': document.getElementById('inputEmailConfirmation').value,
      password: document.getElementById('inputPassword').value
    };

    _this.save(user);
    return false;
  });
};

User.prototype.loadUsers = function() {
  $.ajax({
    method: 'get', 
    url: '/secure/users',
    dataType: 'json',
    contentType: 'application/json',
    headers: {
      'Authorization': 'JWT ' + localStorage.getItem('access_token')
    }
  }).done(function(users){
    _this.application.render('users/list', function(users) {
    });
  }).fail(function(data){
    _this.renderError(data.error);
  });
};

User.prototype.save = function(user) {
  var _this = this;
  $.ajax({
    method: 'post', 
    url: '/users',
    data: JSON.stringify(user),
    dataType: 'json',
    contentType: 'application/json'
  }).done(function(){
    window.reload();
  }).fail(function(data){
    _this.renderError(data.error);
  });
};

User.prototype.renderError = function() {
};

