/// <reference path="pages/home.html" />
// 
// Here is how to define your module 
// has dependent on mobile-angular-ui
// 


var app = angular.module('MobilePenelope', [
  "ngRoute",
  "mobile-angular-ui",
  "ngSanitize","ui.bootstrap", "dialogs.main",
  "ngTouch", "angucomplete-alt",
  "mobile-angular-ui.gestures"
]);
                                                                                  

app.config(function ($routeProvider) {
    $routeProvider.when('/', { templateUrl: 'pages/beta/home2.html', reloadOnSearch: false });
    $routeProvider.when('/login', { templateUrl: 'login.html', reloadOnSearch: false });
    $routeProvider.when('/home', { templateUrl: 'pages/beta/home2.html', reloadOnSearch: false });
    $routeProvider.when('/bancos', { templateUrl: 'pages/beta/bancos.html', reloadOnSearch: false });
    $routeProvider.when('/hoteis', { templateUrl: 'pages/beta/hoteis.html', reloadOnSearch: false });
    $routeProvider.when('/sair', { templateUrl: 'pages/beta/sair.html', reloadOnSearch: false });
    //novo
    $routeProvider.when('/cadastroUsuario', { templateUrl: 'pages/beta/usuario.html', reloadOnSearch: false });
    $routeProvider.when('/lancamentoCompra', { templateUrl: 'pages/beta/pedidos.html', reloadOnSearch: false });
    $routeProvider.when('/lancamentoVenda', { templateUrl: 'pages/beta/vendas2.html', reloadOnSearch: false });

    //outros
    $routeProvider.when('/listaUsuario', { templateUrl: 'geta/usuario/listusuario.html', reloadOnSearch: false });
    $routeProvider.when('/editUsuario/:itemId', { templateUrl: 'pages/usuario/editusuario.html', reloadOnSearch: false });

    $routeProvider.when('/listParcelaLancamentoCompra/:itemId', { templateUrl: 'pages/lancamentoCompra/listParcelaLancamentoCompra.html', reloadOnSearch: false });
    $routeProvider.when('/editParcelaLancamentoCompra/:itemId,:pStatusParcela,:pValorParcela,:pDataVencimento,:pLancamentoId', { templateUrl: 'pages/lancamentoCompra/editParcelaLancamentoCompra.html', reloadOnSearch: false });

    // passo para venda
    // here now
    $routeProvider.when('/lancamentoVendaProduto', { templateUrl: 'pages/beta/lancamentoVendaProduto.html', reloadOnSearch: false });
    $routeProvider.when('/gerenciarVenda', { templateUrl: 'pages/beta/gerenciarVenda.html', reloadOnSearch: false });
    $routeProvider.when('/saldo', { templateUrl: 'pages/beta/saldo.html', reloadOnSearch: false });

    // 
    $routeProvider.when('/listParcelaVendaCliente/:itemId,:pcliId,:pcliNome,:pvalorTotal,:pformaPagamento,:pdataPedido', { templateUrl: 'pages/beta/listParcelaVendaCliente.html', reloadOnSearch: false });
    $routeProvider.when('/editParcelaVendaCliente/:itemId,:pStatusParcela,:pValorParcela,:pDataVencimento,:pLancamentoId', { templateUrl: 'pages/beta/editParcelaVendaCliente.html', reloadOnSearch: false });

});

app.controller('MainController', function ($rootScope, $scope) {

    // User agent displayed in home page
    $scope.userAgent = navigator.userAgent;

    $rootScope.menu1 = true;
    $rootScope.menu2 = false;

    $rootScope.idUsuario = 0;
    $rootScope.saudacao = "";
    $rootScope.AppTitle = "II Colóquio Internacional Mídia e Discursos da Amazônia";
    $rootScope.checked = false;
    $rootScope.AppVersion = "1.0"
    $rootScope.usr_id = 0;
    $rootScope.usr_name = '';
    $rootScope.Servidor = "http://localhost:8080";
    //$rootScope.Servidor = "http://201.90.97.6:8080";
    var data = new Date();
    lmes = data.getMonth() + 1;
    lano = data.getFullYear();
    $rootScope.mes = lmes;
    $rootScope.ano = lano;
    $rootScope.DataCorrente = data

    // Needed for the loading screen
    $rootScope.$on('$routeChangeStart', function () {
        $rootScope.loading = true;
    });

    $rootScope.$on('$routeChangeSuccess', function () {

        $rootScope.loading = false;
    });

});

app.controller('SairController', function ($rootScope, $scope, $location) {

    // User agent displayed in home page
    $scope.userAgent = navigator.userAgent;

    $rootScope.menu1 = true;
    $rootScope.menu2 = false;
    $rootScope.checked = false;
    $rootScope.saudacao = "";
    $rootScope.idUsuario = 0;
    $rootScope.AppTitle = "Penélope"
    $rootScope.AppVersion = "1.0"
    $rootScope.usr_id = 0;
    $rootScope.usr_name = '';
    $location.path('/');


});
