var Application = function() {
};

Application.prototype.checkUserExists = function(existsCallback, nonExistsCallback) {
  $.ajax({
    method: 'get', 
    url: '/users/empty'
  }).done(function(data){
    if (data.empty) {
      nonExistsCallback();
    } else {
      existsCallback();
    }
  });
};

Application.prototype.init = function() {
  var _this = this;

  if (!_this.isLogged()) {
    _this.checkUserExists(
      function() {
        _this.render('login', function() {
          var login = new Login();
          login.init();
        });
      },
      function() {
        _this.render('users/form', function() {
          var user = new User();
          user.init(_this);
        });
      }
    );
  } else {
    _this.render('dashboard', function() {
      var dashboard = new Dashboard();
      dashboard.init(_this);
    });
  }
};

Application.prototype.render = function(partial, onDone, options) {
  options = options || {};
  $.ajax({
    method: 'get', 
    url: '/partials/' + partial + '.html?_=' + new Date().getTime()
  }).done(function(data){
    var template = doT.template(data);
    destination = options.destination || 'body';
    $(destination).html(template(options.data || {}));
    if (onDone) {
      onDone();
    }
  });
};

Application.prototype.isLogged = function() {
  return localStorage.getItem("access_token");
};

Application.prototype.clearSession = function() {
  localStorage.removeItem("access_token");
  window.location.reload();
};

var application = new Application();
application.init();

