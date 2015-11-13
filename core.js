var app = angular.module('MobileDcima', [
  "ngRoute",
  "mobile-angular-ui",
  "ngSanitize", "ui.bootstrap", "dialogs.main",
  "ngTouch", "angucomplete-alt",
  "mobile-angular-ui.gestures"
]);

app.config(function ($routeProvider) {
    $routeProvider.when('/', { templateUrl: 'pages/beta/home2.html', reloadOnSearch: false });
    $routeProvider.when('/login', { templateUrl: 'login.html', reloadOnSearch: false });
    $routeProvider.when('/home', { templateUrl: 'pages/beta/home2.html', reloadOnSearch: false });
    $routeProvider.when('/setup', { templateUrl: 'pages/beta/setup.html', reloadOnSearch: false });
    $routeProvider.when('/bancos', { templateUrl: 'pages/beta/bancos.html', reloadOnSearch: false });
    $routeProvider.when('/hoteis', { templateUrl: 'pages/beta/hoteis.html', reloadOnSearch: false });
    $routeProvider.when('/transporte', { templateUrl: 'pages/beta/transporte.html', reloadOnSearch: false });
    $routeProvider.when('/conteudo/:term_id', { templateUrl: 'pages/beta/conteudo.html', reloadOnSearch: false });
    $routeProvider.when('/sair', { templateUrl: 'pages/beta/sair.html', reloadOnSearch: false });
    //novo
    $routeProvider.when('/cadastroUsuario', { templateUrl: 'pages/beta/usuario.html', reloadOnSearch: false });

});

app.controller('MainController', function ($rootScope, $scope, $http) {

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
    
    //$rootScope.Servidor = "http://192.168.1.192";
    $rootScope.Servidor = "http://201.90.97.8";
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


    $http.get($rootScope.Servidor + '/getmenu').success(simpleCallback);

    function simpleCallback(data, status) {
        var Total = 0;
        $scope.Lista = data;
    }

    document.addEventListener("deviceready", function () {
        var device = $cordovaDevice.getDevice();
        var cordova = $cordovaDevice.getCordova();
        var model = $cordovaDevice.getModel();
        var platform = $cordovaDevice.getPlatform();
        var uuid = $cordovaDevice.getUUID();
        var version = $cordovaDevice.getVersion();
    }, false);

    // sidebar right
    // 
    // Right Sidebar
    // 
    $scope.chatUsers = [
      { name: 'no Evento', online: false }
    ];


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



