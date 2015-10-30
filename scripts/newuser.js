app.controller('NewUserController', function ($rootScope, $scope, $http, $location) {
    // init
    $scope.record = {
        usr_name: '',
        usr_email: '',
        usr_senha: ''
    };

    // behavior
    $scope.Registro = function () {

        $http.post($rootScope.Servidor + '/adduser', $scope.record).success(confirmaCallback);
    }

    function confirmaCallback(data, status) {
        $scope.Resultado = status;
        if (data.erro == "1") {
            if (data.retorno == "ER_DUP_ENTRY") {
                alert('Email já está cadastrado');
            }
            else {
                alert('Verifique sua conexão com a Internet');
            }
        }
        else {
            $rootScope.usr_id = data.retorno;
            $rootScope.usr_name = $scope.record.usr_name;
            $location.path('/home');
        }
        
    }

});