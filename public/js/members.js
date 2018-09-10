var Member = function() {
};

Member.prototype.init = function() {
  var _this = this;
  _this.loadMembers();
};

Member.prototype.initButtons = function() {
  var _this = this;
  $('#newMember').click(function(event){
    event.preventDefault();
    event.stopPropagation();
    _this.application.render('members/form', function() {
      _this.initFormSubmit();
    }, {
      destination: '#mainContent'
    });
  });
};

Member.prototype.loadMembers = function() {
  var _this = this;
  $.ajax({
    method: 'get', 
    url: '/secure/members',
    dataType: 'json',
    contentType: 'application/json',
    headers: {
      'Authorization': 'JWT ' + localStorage.getItem('access_token')
    }
  }).done(function(members){
    _this.application.render('members/list', function() {
      _this.initButtons();
    }, {
        data: { meetings: meetings },
        destination: '#members'
    });
  }).fail(function(data){
    _this.renderError(data.error);
  });
};

