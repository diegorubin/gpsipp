var Group = function() {
};

Group.prototype.init = function(application, groupId) {
  var _this = this;
  _this.application = application;

  if (groupId) {
    _this.showGroup(groupId);
  } else {
    _this.loadGroups();
  }

};

Group.prototype.initButtons = function() {
  var _this = this;
  $('#newGroup').click(function(event){
    event.preventDefault();
    event.stopPropagation();
    _this.application.render('groups/form', function() {
      _this.initFormSubmit();
    }, {
      destination: '#mainContent'
    });
  });
  $('.groupLink').click(function(event){
    event.preventDefault();
    event.stopPropagation();

    var id = event.target.getAttribute('data-id');
    _this.showGroup(id);

  });
};

Group.prototype.showGroup = function(groupId) {
  var _this = this;
  $.ajax({
    method: 'get', 
    url: '/secure/groups/' + groupId,
    dataType: 'json',
    contentType: 'application/json',
    headers: {
      'Authorization': 'JWT ' + localStorage.getItem('access_token')
    }
  }).done(function(group) {
    _this.application.render('groups/show', function() {
      _this.listMeetings(groupId);
    }, {
        data: { group: group },
        destination: '#mainContent'
      });
  }).fail(function(data){
    console.log(data);
    if (data.status == 401) {
      _this.application.clearSession();
    }
  });
};

Group.prototype.listMeetings = function(groupId) {
  var _this = this;
  $.ajax({
    method: 'get', 
    url: '/secure/meetings?group_id=' + groupId,
    dataType: 'json',
    contentType: 'application/json',
    headers: {
      'Authorization': 'JWT ' + localStorage.getItem('access_token')
    }
  }).done(function(meetings) {
    _this.application.render('meetings/list', function() {
      _this.initButtons();
    }, {
        data: { meetings: meetings },
        destination: '#meetings'
      });
  }).fail(function(data){
    console.log(data);
    if (data.status == 401) {
      _this.application.clearSession();
    }
  });
};

Group.prototype.initFormSubmit = function() {
  var _this = this;
  $('.form-group').submit(function(event) {
    event.preventDefault();
    event.stopPropagation();

    var group = {
      name: document.getElementById('inputName').value,
      address: document.getElementById('inputAddress').value,
      day_of_week: document.getElementById('inputDayOfWeek').value
    };

    $.ajax({
      method: 'post', 
      url: '/secure/groups',
      data: JSON.stringify(group),
      dataType: 'json',
      contentType: 'application/json',
      headers: {
        'Authorization': 'JWT ' + localStorage.getItem('access_token')
      }
    }).done(function(){
      _this.loadGroups();
    }).fail(function(data){
      _this.renderError(data.error);
    });
    return false;
  });
};

Group.prototype.loadGroups = function() {
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
    _this.application.render('groups/list', function() {
      _this.initButtons();
    }, {
        data: { groups: groups },
        destination: '#mainContent'
      });
  }).fail(function(data){
    console.log(data);
    if (data.status == 401) {
      _this.application.clearSession();
    }
  });
};

