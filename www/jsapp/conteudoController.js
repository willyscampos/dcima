app.controller('conteudoController', function ($rootScope, $scope, $http, $location, $sce, $routeParams) {

    var term_id = $routeParams.term_id;   

    $rootScope.saudacao = "Olá,";
    $rootScope.statusMenu = false;
    $rootScope.idUsuario = 1;
    $rootScope.usr_name = 'Visitante';
    $rootScope.nomeUsuario = 'Visitante';
    $rootScope.usuarioPerfil_nome = '';
    $rootScope.usuarioPerfil_id = '';    
    $rootScope.checked = true;
    $rootScope.menu1 = false;
    $rootScope.menu2 = true;

    $scope.Lista = [];

    $scope.objeto = {
        term_id: term_id
    };

    
    if ($rootScope.idUsuario == 0) //usuário já está logado
    {
        $location.path('/');
    }

    $http.post($rootScope.Servidor + '/getConteudo', $scope.objeto).success(simpleCallback);

    function simpleCallback(data, status) {
        var Total = 0;
        $scope.Lista = data;
    }

    $scope.SkipValidation = function (value) {
        return $sce.trustAsHtml(value);
    };

});
