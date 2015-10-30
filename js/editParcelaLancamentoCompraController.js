app.controller('editParcelaLancamentoCompraController', function ($rootScope, $scope, $routeParams, $http, $filter) {

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
  

    console.log($rootScope.usuarioPerfil_id);

    $scope.objEditParcela = {

        lxp_id: '',
        usp_id: '',
        lxp_data_vencimento:''
    };
    

    $scope.alteraDataVencimentoCompra = function () {

        $scope.objEditParcela.lxp_id = id;
        $scope.objEditParcela.lxp_data_vencimento = $filter('date')($scope.data_vencimento, 'yyyy-MM-dd');        

        $http.post($rootScope.Servidor + '/updateVencimentoParcelaCompra', $scope.objEditParcela).success(alterarDataVencimentoCompraCallback);

    };

    function alterarDataVencimentoCompraCallback(data, status) {

       
        if (data.error) {
            $('#msg').append('<p class="alert alert-danger">Erro ! Server error, tente novamente</p>');

        } else {
            $('#msg').append('<p class="alert alert-success">Alteração realizada com sucesso !</p>');
        }
        

    }


    



});
