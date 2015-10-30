app.controller('gerenciarVendaController', function ($rootScope, $scope, $http, $filter) {

    $rootScope.ondeestou = "Paginação";
    $rootScope.statusMenu = false;
    
    console.log($rootScope.usuarioPerfil_id);

    //Paginação
    $scope.totalItems = 64;
    $scope.currentPage = 1;
    $scope.maxSize = 5;
    $scope.bigTotalItems = 175;
    $scope.bigCurrentPage = 1;

    $scope.ObjetoPaginacao = {
        numero_pagina: 0,
        quantidade: 10,
        pesquisa: '',
        idPerfilUsuario: ''
    };


    $scope.objLancamentoVenda = {

        usp_id: '',
        lac_data_pedido: '',
        lac_valor: '',
        lac_data_vencimento: '',
        lac_forma_pagamento: '',
        lac_qtd_parcela: ''
    };



    $scope.listLancamentoVenda = function () {

        $scope.ObjetoPaginacao.numero_pagina = 0;
        $scope.ObjetoPaginacao.quantidade = 10;
        $scope.ObjetoPaginacao.idPerfilUsuario = $rootScope.usuarioPerfil_id;

        $http.post($rootScope.Servidor + '/listVenda', $scope.ObjetoPaginacao).success(listLancamentoVendaCallback);

    };

    //// Funções 
    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function () {
        console.log('Page changed to: ' + $scope.currentPage);
        $scope.Objeto.numero_pagina = $scope.currentPage;
        $http.post($rootScope.Servidor + '/listVenda', $scope.ObjetoPaginacao).success(listLancamentoVendaCallback);
    };

    $scope.fnPesquisar = function () {        
        //$scope.Objeto.numero_pagina = 0;
        $http.post($rootScope.Servidor + '/listVenda', $scope.ObjetoPaginacao).success(listLancamentoVendaCallback);
    };

    function listLancamentoVendaCallback(data, status) {
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

});
