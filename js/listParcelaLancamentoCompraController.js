app.controller('listParcelaLancamentoCompraController', function ($rootScope, $scope, $routeParams, $http, $filter) {

    $rootScope.ondeestou = "Paginação";
    $rootScope.statusMenu = false;
    $scope.statusVencimento = true;
    $scope.statusParcela = true;
    $scope.listParcelaCompra = [];
    $scope.Valores = [];
    var id = $routeParams.itemId;

    console.log($rootScope.usuarioPerfil_id);


    $scope.objParcelaCompra = {

        lxp_id:'',
        lac_id: '',
        usp_id: '',
        status_pagamento: ''
    };

    ///$scope.listParcelaLancamentoCompra();
    

    //$scope.registraNovaCompra = function () {

    //    var dataPedido = $filter('date')($scope.data_pedido, 'yyyy-MM-dd');
    //    var dataVencimento = $filter('date')($scope.data_vencimento, 'yyyy-MM-dd');        

    //    $scope.objUsuario = {};
    //    $scope.perfilNome = $scope.forma_pagamento

    //    $scope.objLancamentoCompra.usp_id = $rootScope.usuarioPerfil_id;
    //    $scope.objLancamentoCompra.lac_data_pedido = dataPedido;
    //    $scope.objLancamentoCompra.lac_valor = $scope.valor_pedido;
    //    $scope.objLancamentoCompra.lac_data_vencimento = dataVencimento;
    //    $scope.objLancamentoCompra.lac_forma_pagamento = $scope.forma_pagamento;
    //    $scope.objLancamentoCompra.lac_qtd_parcela = $scope.qtd_parcela;

    //    console.log($scope.objLancamentoCompra);      


    //    $http.post($rootScope.Servidor + '/novaCompra', $scope.objLancamentoCompra).success(novaCompraCallback);
    //}

    //function novaCompraCallback(data, status) {

    //    console.log(data);

    //    console.log(status);

    //    $scope.listLancamentoComptra();
    //    //$scope.retorno = [];
    //    //$scope.retorno = data[0];
    //    //if ($scope.retorno.length > 0) {
    //    //    $scope.Resultado = "Salvo com sucesso";
    //    //    $rootScope.statusMenu = false;
    //    //    $rootScope.idUsuario = $scope.retorno[0].usu_id;
    //    //    $rootScope.nomeUsuario = $scope.retorno[0].usu_nome;
    //    //    $rootScope.usuarioPerfil = $scope.retorno[0].perfil_atual;
    //    //    $rootScope.usuarioPerfil_id = $scope.retorno[0].usp_id;

    //    //    console.log($scope.retorno);
    //    //    //$('#msg').append('<p>Boa Noite:' + $rootScope.nomeUsuario + 'Seja Bem Vindo!</p>');

    //    //    //$location.path('/home');
    //    //}
    //    //console.log($scope.retorno[0].usu_id);
    //    //console.log($scope.retorno.length);

    //}


    $scope.listParcelaLancamentoCompra = function () {

        $scope.objParcelaCompra.lac_id = id;
        $scope.objParcelaCompra.usp_id = $rootScope.usuarioPerfil_id;

        $http.post($rootScope.Servidor + '/listParcelaCompra', $scope.objParcelaCompra).success(listParcelaLancamentoCompraCallback);

    };

    function listParcelaLancamentoCompraCallback(data, status) {

        //$scope.listParcelaCompra = $scope.Valores;
        $scope.Valores = [];
        angular.forEach(data, function (value, key) {
            $scope.Objeto = value;

            //alert(value.LXP_STATUS_PAGAMENTO);
            //$scope.Objeto.LAC_ID = data.LAC_ID;
            if (value.LXP_STATUS_PAGAMENTO == 1) {
                $scope.Objeto.LXP_STATUS_PAGAMENTO = true;
            }
            else {
                $scope.Objeto.LXP_STATUS_PAGAMENTO = false;
            }
            $scope.Valores.push($scope.Objeto);
        });

        $scope.listParcelaCompra = $scope.Valores;

        console.log(data[0]);
        $scope.data_pedido = $filter('date')(data[0].LAC_DATA_PEDIDO, 'dd/MM/yyyy');
        $scope.valor_pedido = data[0].VALOR_TOTAL;
        $scope.forma_pagamento = data[0].FORMA_PAGAMENTO;

    }

   

    $scope.pagamento = function ($event, id) {


        var checkbox = $event.target;
        var action = (checkbox.checked ? 'add' : 'remove');
        if (action === 'add') {
            //selected.push(id);

            updatePagamento(id, 1);
            //alert(id + t);
            

        }


        if (action === 'remove') {
            //selected.splice(selected.indexOf(id), 1);

            updatePagamento(id, 0);
            //$scope.listParcelaLancamentoCompra();
        }

        
            //alert(id);

        // Highlight selected row. HOW??
        // $(checkbox).parents('tr').addClass('selected_row', checkbox.checked);
    };


    function updatePagamento (linhaId,status) {

        $scope.objParcelaCompra.lxp_id = linhaId;
        $scope.objParcelaCompra.status_pagamento = status;

        $http.post($rootScope.Servidor + '/updatePagamentoCompra', $scope.objParcelaCompra).success(updatePagamentoCompraCallback);

    };

    function updatePagamentoCompraCallback(data, status) {


        if (data.error) {
            //$('#msg').append('<p class="alert alert-danger">Erro ! Server error, tente novamente</p>');

        } else {
            //$('#msg').append('<p class="alert alert-success">Alteração realizada com sucesso !</p>');
            alert('Confirmado com sucesso');
            $scope.listParcelaLancamentoCompra();
        }

        
    }



    

    //$scope.isSelected = function (id) {
    //    return $scope.selected.indexOf(id) >= 0;
    //};
    
});
