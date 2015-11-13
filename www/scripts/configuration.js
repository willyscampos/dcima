app.controller('ConfigurationController', function ($rootScope, $scope, $http, $location) {
    // init
    var lusr_id = $rootScope.usr_id;

    $scope.record = {
        usr_id: lusr_id,
        con_goal: 0,
        con_month: $rootScope.mes,
        con_year: $rootScope.ano
    };

    if (lusr_id == 0) {
        alert('Usuário ainda não foi identificado');
        $location.path('/entrar');
    }
    
    $http.post($rootScope.Servidor + '/getgoal', $scope.record).success(goalCallback);

    // behavior
    $scope.Registro = function () {
        console.log($scope.record);
        $http.post($rootScope.Servidor + '/goal', $scope.record).success(confirmaCallback);
    }

    function confirmaCallback(data, status) {
        $scope.Resultado = status;
        if (data.erro == "1") {
            alert('Verifique sua conexão com a Internet');
        }
        else {
            $location.path('/home');
        }

    }

    function goalCallback(data, status) {
        $scope.Resultado = status;
        if (data.erro == "1") {
            alert('Verifique sua conexão com a Internet');
        }
        else {
            $scope.record.con_goal = data.con_goal;
        }

    }

});