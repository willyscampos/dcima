app.controller('listParcelaVendaClienteController', function ($rootScope, $scope, $routeParams, $http, $filter) {

    $rootScope.ondeestou = "Paginação";
    $rootScope.statusMenu = false;
    $scope.statusVencimento = true;
    $scope.statusParcela = true;
    $scope.listParcelaVendaCli = [];
    $scope.Valores = [];
    var id = $routeParams.itemId;
     $rootScope.clienteId = $routeParams.pcliId;
     $rootScope.clienteNome = $routeParams.pcliNome;
     $rootScope.valorTotal = $routeParams.pvalorTotal;
     $rootScope.formaPgto = $routeParams.pformaPagamento;
     $rootScope.dataPedido = $routeParams.pdataPedido;
   
    console.log($rootScope.usuarioPerfil_id);

    $scope.data_pedido = $filter('date')($rootScope.dataPedido, 'dd/MM/yyyy');
    $scope.valor_pedido = $rootScope.valorTotal;
    $scope.forma_pagamento = $rootScope.formaPgto;
    $scope.cliente_nome = $rootScope.clienteNome;


    $scope.objParcelaVenda = {

        lvp_id:'',
        lav_id:'',
        usp_id:'',
        cli_id:'',
        status_pagamento: ''
    };
    

    $scope.listParcelaVendaCliente = function () {

        $scope.objParcelaVenda.lav_id = id;
        $scope.objParcelaVenda.usp_id = $rootScope.usuarioPerfil_id;
        $scope.objParcelaVenda.cli_id = $rootScope.clienteId;

        $http.post($rootScope.Servidor + '/listParcelaVendaCliente', $scope.objParcelaVenda).success(listParcelaVendaClienteCallback);

    };

    function listParcelaVendaClienteCallback(data, status) {

        //$scope.listParcelaCompra = $scope.Valores;
        $scope.Valores = [];
        angular.forEach(data, function (value, key) {
            $scope.Objeto = value;

            //alert(value.LXP_STATUS_PAGAMENTO);
            //$scope.Objeto.LAC_ID = data.LAC_ID;
            if (value.LVP_STATUS_PAGAMENTO == 1) {
                $scope.Objeto.LVP_STATUS_PAGAMENTO = true;
            }
            else {
                $scope.Objeto.LVP_STATUS_PAGAMENTO = false;
            }
            $scope.Valores.push($scope.Objeto);
        });

        $scope.listParcelaVendaCli = $scope.Valores;

        //console.log(data);
        //$scope.data_pedido = $filter('date')(data[0].LAV_DATA_PEDIDO, 'dd/MM/yyyy');
        //$scope.valor_pedido = data[0].VALOR_TOTAL;
        //$scope.forma_pagamento = data[0].FORMA_PAGAMENTO;
        //$scope.cliente_nome = data[0].CLI_NOME;

    }

   

    $scope.pagamento = function ($event, linha) {
                
        var checkbox = $event.target;
        var action = (checkbox.checked ? 'add' : 'remove');
        if (action === 'add') {
            //selected.push(id);

            updatePagamento(linha, 1);
            //alert(id + t);
            

        }


        if (action === 'remove') {
            //selected.splice(selected.indexOf(id), 1);

            updatePagamento(linha, 0);
            //$scope.listParcelaLancamentoCompra();
        }

        
            //alert(id);

        // Highlight selected row. HOW??
        // $(checkbox).parents('tr').addClass('selected_row', checkbox.checked);
    };


    function updatePagamento (linhaId,status) {

        $scope.objParcelaVenda.lvp_id = linhaId;
        $scope.objParcelaVenda.status_pagamento = status;

        $http.post($rootScope.Servidor + '/updatePagamentoClienteVenda', $scope.objParcelaVenda).success(updatePagamentoVendaCallback);

    };

    function updatePagamentoVendaCallback(data, status) {


        if (data.error) {
            //$('#msg').append('<p class="alert alert-danger">Erro ! Server error, tente novamente</p>');

        } else {
            //$('#msg').append('<p class="alert alert-success">Alteração realizada com sucesso !</p>');
            alert('Confirmado com sucesso');
            $scope.listParcelaVendaCliente();
        }

        
    }



    

    //$scope.isSelected = function (id) {
    //    return $scope.selected.indexOf(id) >= 0;
    //};
    
});
