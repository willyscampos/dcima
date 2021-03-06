﻿app.controller('homeController', function ($rootScope, $scope, $http, $location, $sce) {

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

    var lServidor = "http://201.90.97.8";


    $scope.myInterval = 3000;
    $scope.slides = [
      {
          url: 'http://www.ieptb.com.br/',
          image: 'images/slide1.jpg'
      },
      {
          url: 'http://www.ieptb.com.br/',
          image: 'images/slide2.jpg'
      },
      {
          url: 'http://www.ieptb.com.br/',
          image: 'images/slide3.jpg'
      }
    ];

    if ($rootScope.idUsuario == 0) //usuário já está logado
    {
        $location.path('/');
    }


    var lObjeto = [];
    $scope.LoadInfo = function () {
        //alert('e agora....info')
        //alert(lServidor + '/home');
        $http.post(lServidor + '/home', lObjeto).success(simpleCallback);
    }    

    function simpleCallback(data, status) {
        var Total = 0;
        //alert('dados');
        //alert(data);
        $scope.Lista = data;
    }

    $scope.SkipValidation = function (value) {
        return $sce.trustAsHtml(value);
    };

});
