app.controller('UsuarioController', function ($rootScope, $scope, $http, $window, $location) {

    if ($rootScope.idUsuario != 0) //usuário já está logado
    {
        $location.path('/home');
    }
    else {
        $rootScope.statusMenu = true;
        $rootScope.nomeUsuario = '';
        $rootScope.usuarioPerfil_nome = '';
        $rootScope.usuarioPerfil_id = '';
        $scope.perfil = '';
        $scope.perfilNome = [];
        $scope.listPerfil = [];
    }


    $scope.objUsuario = {
        usu_nome: '',
        usu_email: '',
        usu_senha: '',
        perfil_usuario: '',
        nome_perfil: ''
    };


    $scope.InitPerfil = function () {
        $http.post($rootScope.Servidor + '/lisPerfil', $scope.ObjetoPerfil).success(confirmaCallback);

    }

    function confirmaCallback(data, status) {
        $scope.listPerfil = data;
    }

    //-----------------projeto pandora --------------------
    $scope.novoUsuario = function () {
        $scope.objUsuario = {};
        $scope.perfilNome = $scope.perfil.split('-')

        $scope.objUsuario.usu_nome = $scope.usuario,
        $scope.objUsuario.usu_email = $scope.email,
        $scope.objUsuario.usu_senha = $scope.senha,
        $scope.objUsuario.perfil_usuario = $scope.perfilNome[0],
        $scope.objUsuario.nome_perfil = $scope.perfilNome[1]

        console.log($scope.objUsuario);


        $http.post($rootScope.Servidor + '/novoUsuario', $scope.objUsuario).success(novoUsuarioCallback);
    }

    function novoUsuarioCallback(data, status) {

        $scope.retorno = [];
        $scope.retorno = data[0];
        if ($scope.retorno.length > 0) {
            $scope.Resultado = "Salvo com sucesso";
            $rootScope.saudacao = "Olá,";
            $rootScope.statusMenu = false;
            $rootScope.idUsuario = $scope.retorno[0].usu_id;
            $rootScope.nomeUsuario = $scope.retorno[0].usu_nome;
            $rootScope.usuarioPerfil_nome = $scope.retorno[0].perfil_atual;
            $rootScope.usuarioPerfil_id = $scope.retorno[0].usp_id;


            $rootScope.checked = true;
            $rootScope.menu1 = false;
            $rootScope.menu2 = true;

            sessionStorage.setItem('idUsuario', $scope.retorno[0].usu_id);
            sessionStorage.setItem('usp_id', $scope.retorno[0].usp_id);

            

            console.log($scope.retorno);

            $location.path('/home');
        }
        console.log($scope.retorno[0].usu_id);
        console.log($scope.retorno.length);
    }

    $scope.cadastro = function () {
        $location.path('/cadastroUsuario');
    };

    $scope.voltar = function () {
        $location.path('/');
    };

    $scope.entrar = function () {

        $scope.objUsuario.usu_email = $scope.valida_email,
        $scope.objUsuario.usu_senha = $scope.valida_senha,

        //Autenticar Usuario
        $http.post($rootScope.Servidor + '/autenticaUsuario', $scope.objUsuario).success(autenticaUsuarioCallback);

    };

    function autenticaUsuarioCallback(data, status) {

        console.log(data);

        if (data.length > 0) {

            $rootScope.saudacao = "Olá,";
            $rootScope.statusMenu = false;
            $rootScope.idUsuario = data[0].usu_id;
            $rootScope.usr_name = data[0].usu_nome;
            $rootScope.nomeUsuario = data[0].usu_nome;
            $rootScope.usuarioPerfil_nome = data[0].perfil_atual;
            $rootScope.usuarioPerfil_id = data[0].usp_id;


            $rootScope.checked = true;
            $rootScope.menu1 = false;
            $rootScope.menu2 = true;
            

            //xico

            // Store value on browser for duration of the session
            sessionStorage.setItem('idUsuario', data[0].usu_id);
            sessionStorage.setItem('usp_id', data[0].usp_id);
            

            
            
            $location.path('/home');

        } else {
            $rootScope.menu1 = true;
            $rootScope.menu2 = false;

            alert('E-mail ou senha incorreta!');
            //$('#msgLogin').append('<p>Boa Noite:' + $rootScope.nomeUsuario + 'Seja Bem Vindo!</p>');
        }


    };

    $scope.testeclick = function () {

        console.log($scope.perfil);
    };


});
