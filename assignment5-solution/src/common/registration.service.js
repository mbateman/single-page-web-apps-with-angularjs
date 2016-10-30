(function () {
"use strict";

angular.module('common')
.service('RegistrationService', RegistrationService);

function RegistrationService() {
  var service = this;

  service.saveRegistrationDetails = function(registration) {
    service.registration = registration;
  }

  service.getRegistrationDetails = function() {
    return service.registration;
  }

}

})();
