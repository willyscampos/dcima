var app = angular.module('Aplicacao', [

  'ngRoute',
  'mobile-angular-ui',
  "ngSanitize",
  'mobile-angular-ui.gestures'
  
  
]);

// Configuração de Rotas
app.config(function ($routeProvider) {
    $routeProvider.when('/', { templateUrl: 'login.html', reloadOnSearch: true });
    $routeProvider.when('/home', { templateUrl: 'home.html', reloadOnSearch: true });

    $routeProvider.when('/cadastroUsuario', { templateUrl: 'pages/usuario/usuario.html', reloadOnSearch: false });
    $routeProvider.when('/listaUsuario', { templateUrl: 'pages/usuario/listusuario.html', reloadOnSearch: false });
    $routeProvider.when('/editUsuario/:itemId', { templateUrl: 'pages/usuario/editusuario.html', reloadOnSearch: false });
    $routeProvider.when('/lancamentoCompra', { templateUrl: 'pages/lancamentoCompra/lancamentoCompra.html', reloadOnSearch: false });
    $routeProvider.when('/listParcelaLancamentoCompra/:itemId', { templateUrl: 'pages/lancamentoCompra/listParcelaLancamentoCompra.html', reloadOnSearch: false });
    $routeProvider.when('/editParcelaLancamentoCompra/:itemId,:pStatusParcela,:pValorParcela,:pDataVencimento,:pLancamentoId', { templateUrl: 'pages/lancamentoCompra/editParcelaLancamentoCompra.html', reloadOnSearch: false });
    $routeProvider.when('/lancamentoVenda', { templateUrl: 'pages/lancamentoVenda/lancamentoVenda.html', reloadOnSearch: false });
    $routeProvider.when('/lancamentoVendaProduto', { templateUrl: 'pages/lancamentoVenda/lancamentoVendaProduto.html', reloadOnSearch: false });
    $routeProvider.when('/gerenciarVenda', { templateUrl: 'pages/lancamentoVenda/gerenciarVenda.html', reloadOnSearch: false });
    $routeProvider.when('/listParcelaVendaCliente/:itemId,:pcliId,:pcliNome,:pvalorTotal,:pformaPagamento,:pdataPedido', { templateUrl: 'pages/lancamentoVenda/listParcelaVendaCliente.html', reloadOnSearch: false });
    $routeProvider.when('/editParcelaVendaCliente/:itemId,:pStatusParcela,:pValorParcela,:pDataVencimento,:pLancamentoId', { templateUrl: 'pages/lancamentoVenda/editParcelaVendaCliente.html', reloadOnSearch: false });
    // outros
    $routeProvider.when('/chamadaget', { templateUrl: 'pages/misc/chamadaget.html', reloadOnSearch: false });
    $routeProvider.when('/paginacao', { templateUrl: 'pages/misc/paginacao.html', reloadOnSearch: false });

    
});

// controller principal da aplicação
app.controller('MainController', function ($rootScope, $scope) {
    //$rootScope.statusMenu = true;
    alert('xico');
    //$rootScope.perfilLogin = $rootScope.usuarioPerfil_nome;
    $rootScope.Servidor = "http://localhost:8080";
    $rootScope.usr_name = "Seu Nome";

    

    //// Needed for the loading screen
    $rootScope.$on('$routeChangeStart', function () {
        $rootScope.loading = true;
    });

    $rootScope.$on('$routeChangeSuccess', function () {
        $rootScope.loading = false;
    });

});

