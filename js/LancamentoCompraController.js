app.controller('LancamentoCompraController', function ($rootScope, $scope, $http, $filter, $location) {

    $rootScope.ondeestou = "Paginação";    
    $rootScope.statusMenu = false;   
    $scope.statusVencimento = true;
    $scope.statusParcela = true;    
    $scope.listFormaPagamento = [];
    $scope.listFormaPagamento = [{ Id: 0, Nome: '' }];
   

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
        idPerfilUsuario: $rootScope.usuarioPerfil_id
    };

    alert($rootScope.idUsuario);

    if ($rootScope.idUsuario == 0) //usuário já está logado
    {
        $location.path('/');
    }


    $scope.objLancamentoCompra = {

        usp_id: '',
        lac_data_pedido: '',
        lac_valor: '',
        lac_data_vencimento: '',
        lac_forma_pagamento:'',
        lac_qtd_parcela:''
    };

    $scope.InitlistFormaPagamento = function () {            
       
        $scope.listFormaPagamento = [
            { Id: 'A', Nome: 'AVISTA' },
            { Id: 'P', Nome: 'PARCELADO' }
        ];
    };

    $scope.InitlistFormaPagamento();

    $scope.fPagamento = function () {       
      
        enabledORdesabledInput($scope.forma_pagamento);
    
    };

    function enabledORdesabledInput(valor) {
        
        if (valor == 'A') {
            $scope.statusVencimento = false;
            $scope.statusParcela = true;
        } else if (valor == 'P') {
            $scope.statusVencimento = false;
            $scope.statusParcela = false;
        }                
    };

    
    $scope.registraNovaCompra = function () {

        var dataPedido = $filter('date')($scope.data_pedido, 'yyyy-MM-dd');
        var dataVencimento = $filter('date')($scope.data_vencimento, 'yyyy-MM-dd');        

        $scope.objUsuario = {};
        $scope.perfilNome = $scope.forma_pagamento
        
        $scope.objLancamentoCompra.usp_id = $rootScope.usuarioPerfil_id;
        $scope.objLancamentoCompra.lac_data_pedido = dataPedido;
        $scope.objLancamentoCompra.lac_valor = $scope.valor_pedido;
        $scope.objLancamentoCompra.lac_data_vencimento = dataVencimento;
        $scope.objLancamentoCompra.lac_forma_pagamento = $scope.forma_pagamento;
        $scope.objLancamentoCompra.lac_qtd_parcela = $scope.qtd_parcela;

        console.log($scope.objLancamentoCompra);      

        
        $http.post($rootScope.Servidor + '/novaCompra', $scope.objLancamentoCompra).success(novaCompraCallback);
    }

    function novaCompraCallback(data, status) {
       
        $scope.listLancamentoCompra();       
        
    }


    $scope.listLancamentoCompra = function () {

        $http.post($rootScope.Servidor + '/listCompra', $scope.ObjetoPaginacao).success(listLancamentoCompraCallback);

    };
          
    //// Funções 
    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function () {
        console.log('Page changed to: ' + $scope.currentPage);
        $scope.Objeto.numero_pagina = $scope.currentPage;
        $http.post($rootScope.Servidor + '/listCompra', $scope.ObjetoPaginacao).success(listLancamentoComptraCallback);
    };

    //$scope.fnPesquisar = function () {        
    //    $scope.Objeto.numero_pagina = 0;
    //    $http.post($rootScope.Servidor + '/listproviders', $scope.Objeto).success(confirmaCallback);
    //};

    function listLancamentoCompraCallback(data, status) {
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
    
    //$scope.testeId = function (valor) {

    //    alert(valor);
    //};


});
