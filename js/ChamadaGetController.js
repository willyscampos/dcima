app.controller('ChamadaGetController', function ($rootScope, $scope, $http) {
    $rootScope.ondeestou = "Usuário para o Google";

    $scope.Registro = function () {
        $http.post($rootScope.Servidor + '/testcrawler2', $scope.objeto).success(confirmaCallback);
    }

    function confirmaCallback(data, status) {
        $scope.retorno = data;       
    }

});
