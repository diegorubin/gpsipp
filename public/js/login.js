var Login = function() {
};

Login.prototype.init = function() {
  $('.form-signin').submit(function(event) {
    return false;
  });
};

