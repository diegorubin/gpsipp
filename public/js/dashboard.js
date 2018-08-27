var Dashboard = function() {
};

Dashboard.prototype.init = function(application) {
  var _this = this;
  _this.application = application;

  _this.initBtnSignOut();
  _this.initMenu();

  $(".datepicker").datepicker();
  $(".datepicker").datepicker('option', 'dateFormat', 'dd/mm/yy');
  _this.loadGroups();
  _this.initMeetingSubmit();

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

Dashboard.prototype.initMeetingSubmit = function() {
  var _this = this;
  $(".form-meeting").submit(function(event){
    event.preventDefault();
    event.stopPropagation();

    var meeting = {
      date: document.getElementById('inputDate').value,
      number_of_participants: document.getElementById('inputNumberOfParticipants').value,
      number_of_children: document.getElementById('inputNumberOfChildren').value,
      number_of_visitors: document.getElementById('inputNumberOfVisitors').value,
      group_id: document.getElementById('inputGroupId').value
    };

    $.ajax({
      method: 'post', 
      url: '/secure/meetings',
      data: JSON.stringify(meeting),
      dataType: 'json',
      contentType: 'application/json',
      headers: {
        'Authorization': 'JWT ' + localStorage.getItem('access_token')
      }
    }).done(function(){
      var group = new Group();
      group.init(_this.application, meeting.group_id);
    }).fail(function(data){
      console.log(data);
      if (data.status) {
        _this.renderError(data.error);
      }
    });

    return false;
  });
};

Dashboard.prototype.loadGroups = function() {
  var _this = this;
  $.ajax({
    method: 'get', 
    url: '/secure/groups',
    dataType: 'json',
    contentType: 'application/json',
    headers: {
      'Authorization': 'JWT ' + localStorage.getItem('access_token')
    }
  }).done(function(groups) {
    var list = $("#inputGroupId");
    for(var i in groups) {
      var group = groups[i];
      list.append("<option value='" + group.id + "'>" + group.name + "</option>");
    }
  }).fail(function(data){
    console.log(data);
    if (data.status == 401) {
      _this.application.clearSession();
    }
  });
};

Dashboard.prototype.initMenu = function() {
  var _this = this;

  $('#dashboardMenuItem').click(function(event) {
    event.stopPropagation();
    event.preventDefault();

    _this.application.init();

  });

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

  $('#reportMenuItem').click(function(event) {
    event.stopPropagation();
    event.preventDefault();

    var report = new Report();
    report.init(_this.application);
  });
};

