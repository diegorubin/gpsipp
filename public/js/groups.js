var Group = function() {
};

Group.prototype.init = function(application) {
  var _this = this;
  _this.application = application;

  _this.loadGroups();

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

    $.ajax({
      method: 'get', 
      url: '/secure/groups/' + id,
      dataType: 'json',
      contentType: 'application/json',
      headers: {
        'Authorization': 'JWT ' + localStorage.getItem('access_token')
      }
    }).done(function(group) {
      console.log(group);
      _this.application.render('groups/show', function() {
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

