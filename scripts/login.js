app.controller('LoginController', function ($rootScope, $scope, $location, $http) {

    // init
    $scope.record = {
        usr_email: '',
        usr_senha: ''        
    };

    // behavior
    $scope.Registro = function () {
        $http.post($rootScope.Servidor + '/getuser', $scope.record).success(confirmaCallback);
    }

    function confirmaCallback(data, status) {
        $scope.Resultado = status;
        if (data.erro == "1") {
            alert('Verifique suas informações');
        }
        else {
            if (data.usr_id == "0") {
                alert('Usuário Inválido!');
            }
            else {
                $rootScope.usr_id = data.usr_id;             
                $rootScope.usr_name = data.usr_name;                
                $location.path('/home');
            }
        }

    }

});