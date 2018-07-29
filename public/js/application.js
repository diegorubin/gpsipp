var Application = function() {
};

Application.prototype.init = function() {
  var _this = this;

  if (!_this.isLogged()) {
    _this.render('login', function() {
      var login = new Login();
      login.init();
    });
  }
};

Application.prototype.render = function(partial, onDone) {
  $.ajax({
    method: 'get', 
    url: '/partials/' + partial + '.html?_=' + new Date().getTime()
  }).done(function(data){
    $('body').html(data);
    if (onDone) {
      onDone();
    }
  })
};

Application.prototype.isLogged = function() {
  return false;
};

var application = new Application();
application.init();

