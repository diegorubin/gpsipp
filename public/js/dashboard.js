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
  var _this = this;

  $("#btnSignOut").click(function(event) {
    event.preventDefault();
    _this.application.clearSession();
    return false;
  });
};

Dashboard.prototype.initMenu = function() {
  var _this = this;

  $('#groupsMenuItem').click(function(event) {
    event.stopPropagation();
    event.preventDefault();

    var group = new Group();
    group.init(_this.application);
  });

  $('#membersMenuItem').click(function(event) {
    event.stopPropagation();
    event.preventDefault();

    var member = new Member();
    member.init(_this.application);
  });

  $('#usersMenuItem').click(function(event) {
    event.stopPropagation();
    event.preventDefault();

    var user = new User();
    user.init(_this.application);
  });
};

