app.controller('EditUsuarioController', function ($rootScope, $scope, $http, $routeParams, $location) {

    $rootScope.ondeestou = "Edição de Usuário";

    var id = $routeParams.itemId;

    $scope.Objeto = {
        usu_id: id
    };

    $http.post($rootScope.Servidor + '/selectuser', $scope.Objeto).success(selectCallback);

    $scope.Registro = function () {
        $http.post($rootScope.Servidor + '/updateuser', $scope.ObjetoEdit).success(EditCallback);
    }

    // retornos Callbacks
    function selectCallback(data, status) {
        $scope.oUsuarioEditar = data;
        $scope.ObjetoEdit = $scope.oUsuarioEditar[0];

    }

    function EditCallback(data, status) {        
        $location.path('/listaUsuario');
    }


});