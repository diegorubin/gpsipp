var Member = function() {
};

Member.prototype.init = function() {
  var _this = this;
  _this.loadMembers();
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
  }).done(function(){
    window.reload();
  }).fail(function(data){
    _this.renderError(data.error);
  });
};

