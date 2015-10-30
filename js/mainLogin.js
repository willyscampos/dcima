var app = angular.module('pandoraLogin', [
  "ngRoute",
  "ngSanitize",
  "ui.bootstrap"
]);

// Configuração de Rotas
app.config(function ($routeProvider) {
    $routeProvider.when('/', { templateUrl: 'home.html', reloadOnSearch: true });
    $routeProvider.when('/usuario', { templateUrl: 'pages/usuario/usuario.html', reloadOnSearch: true });
    

    //$routeProvider.when('/cadastroUsuario', { templateUrl: 'pages/usuario/usuario.html', reloadOnSearch: false });
    //$routeProvider.when('/listaUsuario', { templateUrl: 'pages/usuario/listusuario.html', reloadOnSearch: false });
    //$routeProvider.when('/editUsuario/:itemId', { templateUrl: 'pages/usuario/editusuario.html', reloadOnSearch: false });

    // outros
    //$routeProvider.when('/chamadaget', { templateUrl: 'pages/misc/chamadaget.html', reloadOnSearch: false });
    //$routeProvider.when('/paginacao', { templateUrl:  'pages/misc/paginacao.html', reloadOnSearch: false });

   

});

// controller principal da aplicação
app.controller('MainLoginController', function ($rootScope, $scope) {

    $rootScope.Servidor = "http://localhost:8080";
    $rootScope.ondeestou = "Área Principal";
});


