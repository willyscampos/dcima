app.controller('SpentController', function ($rootScope, $scope, $http, $location) {
    // init
    var lusr_id = $rootScope.usr_id;

    $scope.record = {
        usr_id: lusr_id,
        sp_value: 0,
        sp_date: $rootScope.DataCorrente
    };

    if (lusr_id == 0) {
        alert('Usuário ainda não foi identificado');
        $location.path('/entrar');
    }


    // behavior
    $scope.Registro = function () {
        console.log($scope.record);
        alert($scope.record.sp_value);
        alert($scope.record.sp_date);
        $http.post($rootScope.Servidor + '/regspent', $scope.record).success(confirmaCallback);
    }

    function confirmaCallback(data, status) {
        $scope.Resultado = status;
        if (data.erro == "1") {
            alert('Verifique sua conexão com a Internet');
        }
        else {
            alert('ok')
            $location.path('/home');
        }

    }


});