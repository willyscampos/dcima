app.controller('SaldoController', function ($rootScope, $scope, $http, $filter, $location, dialogs) {


    $scope.getSaldo = function () {
        $scope.objNovoCliente = {};
        $scope.objNovoCliente.usp_id = $rootScope.usuarioPerfil_id;
        $http.post($rootScope.Servidor + '/getSaldo', $scope.objNovoCliente).success(SaldoCallback);
    };


    $scope.selectedCliente = [];

    $scope.new_cliente = false;
    $scope.old_cliente = false;
    $scope.inputNome = "";
    $scope.VendasVlr = 0;
    $scope.VendasPag = 0;
    $scope.ComprasVlr = 0;
    $scope.ComprasPag = 0;


    $scope.cli_id = 0;

    $scope.qtdclientes = $scope.selectedCliente.length;


    $rootScope.ondeestou = "Paginação";
    $rootScope.statusMenu = false;
    $scope.btnStatusProtudo = true;
    $scope.listFormaPagamento = [];
    $scope.listFormaPagamento = [{ Id: 0, Nome: '' }];

    $rootScope.idUsuario = sessionStorage.getItem('idUsuario');
    $rootScope.usuarioPerfil_id = sessionStorage.getItem('usp_id');

    if ($rootScope.idUsuario == 0) //usuário já está logado
    {
        $location.path('/');
    }

    
    $scope.getSaldo();

    //old codes
    $scope.objLancamentoVenda = {
        usp_id: '',
        cli_id: '',
        lac_data_pedido: '',
        lac_valor: '',
        lac_data_vencimento: '',
        lac_forma_pagamento: '',
        lac_qtd_parcela: ''
    };

    
    function SaldoCallback(data, status) {
        
        angular.forEach(data[0], function (value, key) {
            console.log(value);
            if (value.TIPO == "V") {
                $scope.VendasVlr = value.valor_total;
                $scope.VendasPag = value.valor_pago;
            }
            if (value.TIPO == "C") {
                $scope.ComprasVlr = value.valor_total;
                $scope.ComprasPag = value.valor_pago;
            }
        });
    }

});

