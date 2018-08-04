var Group = function() {
};

Group.prototype.init = function() {
  var _this = this;
  _this.loadGroups();
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
  }).done(function(){
    window.reload();
  }).fail(function(data){
    _this.renderError(data.error);
  });
};

