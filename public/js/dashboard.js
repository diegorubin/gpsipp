var Dashboard = function() {
};

Dashboard.prototype.init = function(application) {
  var _this = this;
  _this.application = application;

  _this.initBtnSignOut();
  _this.initMenu();

  feather.replace();
};

Dashboard.prototype.initBtnSignOut = function() {
  $("#btnSignOut").click(function(event) {
    event.preventDefault();

    localStorage.removeItem("access_token");
    window.location.reload();

    return false;
  });
};

Dashboard.prototype.initMenu = function() {
  var _this = this;
  $('#userMenuItem').click(function(event) {
    event.stopPropagation();
    event.preventDefault();

    var user = new User();
    user.init(_this);
    
  });
};

