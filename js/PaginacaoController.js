app.controller('PaginacaoController', function ($rootScope, $scope, $http) {

    $rootScope.ondeestou = "Paginação";

    //Paginação
    $scope.totalItems = 64;
    $scope.currentPage = 1;
    $scope.maxSize = 5;
    $scope.bigTotalItems = 175;
    $scope.bigCurrentPage = 1;

    $scope.Objeto = {
        numero_pagina: 0, 
        quantidade: 10,
        pesquisa : ''
    };

    $http.post($rootScope.Servidor + '/listproviders', $scope.Objeto).success(confirmaCallback);


    // Funções 
    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function () {
        console.log('Page changed to: ' + $scope.currentPage);
        $scope.Objeto.numero_pagina = $scope.currentPage;
        $http.post($rootScope.Servidor + '/listproviders', $scope.Objeto).success(confirmaCallback);
    };

    $scope.fnPesquisar = function () {        
        $scope.Objeto.numero_pagina = 0;
        $http.post($rootScope.Servidor + '/listproviders', $scope.Objeto).success(confirmaCallback);
    };

    function confirmaCallback(data, status) {
        var Total = 0;
        $scope.Lista = data[0];
        $scope.bigTotalItems = data[0][0].TotalRows;
        $scope.totalItems = data[0][0].TotalRows;

        Total = parseInt(data[0][0].QtdePaginas);
        //alert(Total);
        if (Total > 5) {
            $scope.maxSize = 5; 
        }
        else {
            $scope.maxSize = data[0][0].QtdePaginas;
        }
    }
    
    $scope.testeId = function (valor) {

        alert(valor);
    };


});
