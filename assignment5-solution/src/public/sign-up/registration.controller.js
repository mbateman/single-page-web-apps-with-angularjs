(function () {

angular.module('public')
.controller('RegistrationController', RegistrationController);

RegistrationController.$inject = ['RegistrationService', 'MenuService', '$scope', '$timeout'];
function RegistrationController(RegistrationService, MenuService, $scope, $timeout) {
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
    reg.validateShortName(short_name, function(response) {
      $scope.results = response;
    });
    var result = $scope.results;
    var invalid;
    if (result && result.status) {
      invalid = true;
    } else {
      invalid = false;
    }
    return invalid;
  }

  reg.validateShortName = function(short_name, fn) {
    if (short_name == undefined || short_name.length != 2 || last_input == short_name) return true;
    last_input = short_name;
    MenuService.getMenuItem(short_name).then(function(response){
      fn(response);
    }).catch(function (response) {
      fn(response);
    });
  }

}

})();
