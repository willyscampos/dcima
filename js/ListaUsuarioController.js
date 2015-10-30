app.controller('ListaUsuarioController', function ($rootScope, $scope, $http) {

    $rootScope.ondeestou = "Lista de Usuários";

    $scope.Objeto = {
    };

    $http.post($rootScope.Servidor + '/listuser', $scope.Objeto).success(confirmaCallback);

    function confirmaCallback(data, status) {
        $scope.Usuarios = data;
    }

});
