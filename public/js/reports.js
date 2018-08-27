var Report = function() {
};

Report.prototype.init = function(application) {
  var _this = this;
  _this.application = application;
  _this.loadMeetingsReport();
};

Report.prototype.loadMeetingsReport = function() {
  var _this = this;
  $.ajax({
    method: 'get', 
    url: '/secure/reports/meetings',
    dataType: 'json',
    contentType: 'application/json',
    headers: {
      'Authorization': 'JWT ' + localStorage.getItem('access_token')
    }
  }).done(function(result) {
    _this.application.render('reports/meetings', function() {
    }, {
        data: { result: result},
        destination: '#mainContent'
      });
  }).fail(function(data){
    console.log(data);
    if (data.status == 401) {
      _this.application.clearSession();
    }
  });
};

