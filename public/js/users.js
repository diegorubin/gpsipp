var User = function() {
};

User.prototype.init = function() {
  var _this = this;
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

