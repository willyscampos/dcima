app.controller('editParcelaVendaClienteController', function ($rootScope, $scope, $routeParams, $http, $filter) {

    $rootScope.ondeestou = "Paginação";
    $rootScope.statusMenu = false;
    var id = $routeParams.itemId;
    
    var statusParcela = $routeParams.pStatusParcela;
    var valorParcela = $routeParams.pValorParcela;
    var dataVencimentoAtual = $routeParams.pDataVencimento;
    //var lancamentoId = $routeParams.pLancamentoId;
    
    $scope.status_pagamento = statusParcela;
    $scope.valor_vencimento = valorParcela;
    $scope.vencimentoAtual = $routeParams.pDataVencimento;
    $scope.lancamentoId = $routeParams.pLancamentoId;
    
    $scope.lavId = $routeParams.pLancamentoId;
    $scope.cliId = $rootScope.clienteId;
    $scope.CliNome = $rootScope.clienteNome;
    $scope.lavValor = $rootScope.valorTotal;
    $scope.lavFormaPagamento = $rootScope.formaPgto;
    $scope.lavDataPedido = $rootScope.dataPedido;
        

    console.log($rootScope.usuarioPerfil_id);

    $scope.objEditParcela = {

        lvp_id: '',
        usp_id: '',
        lvp_data_vencimento:''
    };
    

    $scope.alteraDataVencimentoCompra = function () {

        $scope.objEditParcela.lvp_id = id;
        $scope.objEditParcela.lvp_data_vencimento = $filter('date')($scope.data_vencimento, 'yyyy-MM-dd');        

        $http.post($rootScope.Servidor + '/updateVencimentoParcelaVenda', $scope.objEditParcela).success(alterarDataVencimentoCompraCallback);

    };

    function alterarDataVencimentoCompraCallback(data, status) {


       
        if (data.error) {
            $('#msg').append('<p class="alert alert-danger">Erro ! Server error, tente novamente</p>');

        } else {
            $('#msg').append('<p class="alert alert-success">Alteração realizada com sucesso !</p>');
        }
        

    }


    



});
