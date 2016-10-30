(function () {

angular.module('public')
.controller('RegistrationController', RegistrationController);

RegistrationController.$inject = ['RegistrationService', 'MenuService', '$scope'];
function RegistrationController(RegistrationService, MenuService, $scope) {
  var reg = this;
  var last_input;

  reg.submit = function () {
    reg.completed = true;
    var menuItem = $scope.results;
    reg.user.menuItem = menuItem;
    RegistrationService.saveRegistrationDetails(reg);
  };

  reg.isShortNameInvalid = function(short_name) {
    var response;
    reg.getMenuItem(short_name, function(response) {
      $scope.results = response;
    });
    var result = $scope.results;
    return true ? result && result.status : false;
  }

  reg.getMenuItem = function(short_name, callback) {
    if (short_name == undefined || short_name.length != 2 || last_input == short_name) return true;
    last_input = short_name;
    MenuService.getMenuItem(short_name).then(function(response){
      callback(response);
    }).catch(function (response) {
      callback(response);
    });
  }

}

})();
