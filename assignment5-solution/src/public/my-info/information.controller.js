(function () {

angular.module('public')
.controller('InformationController', InformationController);

InformationController.$inject = ['RegistrationService', 'MenuService','ApiPath'];
function InformationController(RegistrationService, MenuService, ApiPath) {
  var $ctrl = this;
  $ctrl.basePath = ApiPath;
  $ctrl.menuItem;

  $ctrl.reg = RegistrationService.getRegistrationDetails();

  $ctrl.getRegistrationDetails = function () {
    return RegistrationService.getRegistrationDetails();
  };

  $ctrl.isRegistered = function () {
    return RegistrationService.getRegistrationDetails() != undefined;
  };

}

})();
