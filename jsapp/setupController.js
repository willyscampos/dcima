app.controller('setupController', function ($rootScope, $scope, $http, $cordovaDevice) {

    var init = function () {
        console.log("initializing device");
        try {
            document.addEventListener("deviceready", function () {
                alert('xico');
                $scope.available = $cordovaDevice.getDevice().available;
                $scope.cordova = $cordovaDevice.getCordova();
                $scope.model = $cordovaDevice.getModel();
                $scope.platform = $cordovaDevice.getPlatform();
                $scope.uuid = $cordovaDevice.getUUID();
                $scope.version = $cordovaDevice.getVersion();
                
            }, false);
        }
        catch (err) {
            console.log("Error " + err.message);
            alert("error " + err.message);
        }
    };

    init();

});
