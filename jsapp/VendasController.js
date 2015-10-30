app.controller('VendasController', function ($rootScope, $scope, $http, $filter, $location, dialogs) {

    $scope.selectedCliente = [];

    $scope.new_cliente = false;
    $scope.old_cliente = false;
    $scope.inputNome = "";

    $scope.cli_id = 0;

    $scope.remoteUrlRequestFn = function (str) {
        return { q: str };
    };

    $scope.qtdclientes = $scope.selectedCliente.length;


    $rootScope.ondeestou = "Paginação";
    $rootScope.statusMenu = false;
    $scope.btnStatusProtudo = true;
    $scope.listFormaPagamento = [];
    $scope.listFormaPagamento = [{ Id: 0, Nome: '' }];

    $scope.searchAPI = function (userInputString, timeoutPromise) {
        var objCliente = { usp_id: $rootScope.usuarioPerfil_id, consulta: userInputString };
        return $http.post($rootScope.Servidor + '/listCliente2', objCliente, { timeout: timeoutPromise });
    }


    $rootScope.idUsuario = sessionStorage.getItem('idUsuario');
    $rootScope.usuarioPerfil_id = sessionStorage.getItem('usp_id');

    if ($rootScope.idUsuario == 0) //usuário já está logado
    {
        $location.path('/');
    }

    // changes    
    $scope.$watch('selectedCliente', function (newVal, oldVal) {
        if (jQuery.isEmptyObject($scope.selectedCliente)) {
            $scope.cli_id = 0;
            $scope.new_cliente = true;
            $scope.old_cliente = false;
        }
        else {
            $scope.cli_id = $scope.selectedCliente.description.CLI_ID;
            $scope.new_cliente = false;
            $scope.old_cliente = true;
        }
    });

    $scope.inputChanged = function (str) {
        $scope.inputNome = str;
    }

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

    $scope.registraNovoCliente = function () {
        if ($scope.cli_id == 0) {
            var InputElem = $scope.inputNome;
            if (InputElem.length <= 2) {
                dlg = dialogs.error('Aviso!', 'Favor completar o nome do cliente.');
            }
            else {
                $scope.objNovoCliente = {};
                $scope.objNovoCliente.usp_id = $rootScope.usuarioPerfil_id;
                $scope.objNovoCliente.cli_nome = InputElem;
                $http.post($rootScope.Servidor + '/addcliente', $scope.objNovoCliente).success(GoClienteVendaCallback);
            }
        }
    };

    $scope.registraVenda = function () {
        $scope.clienteId = $scope.cli_id;
        $scope.registraVendaCliente();
    };

    function GoClienteVendaCallback(data, status) {
        if (data != null) {
            console.log($scope.retorno);
            $scope.clienteId = data.retorno;
            $scope.registraVendaCliente();
        } else {
            dlg = dialogs.error('Aviso!', 'Talvez você esteja sem internet.');
        }
    }



    // passo 2 para continuar
    $scope.registraVendaCliente = function () {

        $scope.objLancamentoVenda = {};
        $scope.objLancamentoVenda.usp_id = $rootScope.usuarioPerfil_id;
        $scope.objLancamentoVenda.cli_id = $scope.clienteId;

        console.log($scope.objLancamentoVenda);

        $http.post($rootScope.Servidor + '/novaVenda', $scope.objLancamentoVenda).success(registraVendaClienteCallback);
    }

    function registraVendaClienteCallback(data, status) {

        console.log(data);
        if (data != null) {
            $rootScope.statusMenu = false;

            $rootScope.lancamentoVendaId = data[0][0].LAV_ID;
            $rootScope.nome_cliente = data[0][0].CLI_NOME;

            // com sucesso vamos escolher os produtos
            $location.path('/lancamentoVendaProduto');


        } else {

            $('#msg').append('<p class="alert alert-danger">Erro ! Server error, tente novamente</p>');
        }

    }

    $scope.InitlistFormaPagamento = function () {

        $scope.listFormaPagamento = [
            { Id: 'A', Nome: 'AVISTA' },
            { Id: 'P', Nome: 'PARCELADO' }
        ];
    };

    $scope.InitlistFormaPagamento();

    $scope.fPagamento = function () {

        enabledORdesabledInputProduto($scope.forma_pagamento);

    };

    function enabledORdesabledInputProduto(valor) {

        if (valor == 'A') {
            $scope.statusVencimento = false;
            $scope.statusParcela = true;
        } else if (valor == 'P') {
            $scope.statusVencimento = false;
            $scope.statusParcela = false;
        }
    };

});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/// controller produtos
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// controle dos produtos
app.controller('LancamentoVendaProdutosController', function ($rootScope, $scope, $http, $filter, $location, dialogs) {

    $rootScope.idUsuario = sessionStorage.getItem('idUsuario');
    $rootScope.usuarioPerfil_id = sessionStorage.getItem('usp_id');

    if ($rootScope.idUsuario == 0) //usuário já está logado
    {
        $location.path('/');
    }


    $scope.qtd_produto = 0;
    $rootScope.ondeestou = "Paginação";
    $rootScope.statusMenu = false;
    $scope.btnStatusProtudo = true;
    $scope.statusFormFormaPagamento = true;
    $scope.statusVencimento = true;
    $scope.statusParcela = true;
    $scope.listFormaPagamento = [];
    $scope.listFormaPagamento = [{ Id: 0, Nome: '' }];
    $scope.listaProdutoTabela = [];

    $scope.cliente_nome = $rootScope.nome_cliente;



    $scope.objLancamentoProduto = {

        lav_id: '',
        pro_id: '',
        usp_id: '',
        qtd_produto: ''
    };

    $scope.searchProduto = function (userInputString, timeoutPromise) {
        var objPesquisa = { pve_id: 1, pro_descricao: userInputString };
        return $http.post($rootScope.Servidor + '/ConsultaProduto', objPesquisa, { timeout: timeoutPromise });
    }

    $scope.$watch('selectedProduto', function (newVal, oldVal) {
        if (jQuery.isEmptyObject($scope.selectedProduto)) {
            $scope.pro_id = 0;
            $scope.valor_produto = 0;
            $scope.new_cliente = true;
            $scope.old_cliente = false;
        }
        else {
            $scope.pro_id = $scope.selectedProduto.description.pro_id;
            $scope.valor_produto = $scope.selectedProduto.description.pro_valor;
            $scope.new_cliente = false;
            $scope.old_cliente = true;
        }
    });


    $scope.objLancamentoVendaProduto = {

        lav_id: '',
        usp_id: '',
        lav_data_pedido: '',
        lav_data_vencimento: '',
        lav_forma_pagamento: '',
        lav_qtd_parcela: ''
    };

    $scope.registraProduto = function () {

        var goFlash = true;        

        if ($scope.pro_id == 0)
        {
            dlg = dialogs.error('Aviso!', 'Favor escolher um produto.');
            goFlash = false;
        }

        if ($scope.qtd_produto == 0) {
            dlg = dialogs.error('Aviso!', 'Informar a Quantidade.');
            goFlash = false;
        }        

        if (goFlash) {
            $scope.objLancamentoProduto = {};
            $scope.objLancamentoProduto.lav_id = $rootScope.lancamentoVendaId;
            // pve_id na verdade
            $scope.objLancamentoProduto.pve_id = 1;
            $scope.objLancamentoProduto.pro_id = $scope.pro_id;
            $scope.objLancamentoProduto.qtd_produto = $scope.qtd_produto;


            console.log($scope.objLancamentoProduto);

            $http.post($rootScope.Servidor + '/novoProdutoVenda', $scope.objLancamentoProduto).success(registraProdutoCallback);
        }
    }


    // clear information
    function Clear() {
        $scope.valor_produto = 0;
        $scope.qtd_produto = 0;
        $scope.$broadcast('angucomplete-alt:clearInput');
    }

    function registraProdutoCallback(data, status) {
        Clear();
        listaProdutoVenda();
    }


    $scope.listProduto = function () {

        $scope.objProduto = { usp_id: $rootScope.usuarioPerfil_id };

        $http.post($rootScope.Servidor + '/listProduto', $scope.objProduto).success(listProdutoCallback);

    }

    function listProdutoCallback(data, status) {
        $scope.listaProduto = data;

    }


    $scope.InitlistFormaPagamento = function () {

        $scope.listFormaPagamento = [
            { Id: 'A', Nome: 'AVISTA' },
            { Id: 'P', Nome: 'PARCELADO' }
        ];
    };

    $scope.InitlistFormaPagamento();

    $scope.fPagamento = function () {

        enabledORdesabledInputProduto($scope.forma_pagamento);

    };

    function enabledORdesabledInputProduto(valor) {

        if (valor == 'A') {
            $scope.statusVencimento = false;
            $scope.statusParcela = true;
        } else if (valor == 'P') {
            $scope.statusVencimento = false;
            $scope.statusParcela = false;
        }
    };

    $scope.testeProduto = function () {

        listaProdutoVenda();
    };

    function listaProdutoVenda() {
        $scope.ObjetoVendas = {};
        $scope.ObjetoVendas.lav_id = $rootScope.lancamentoVendaId;
        $scope.ObjetoVendas.usp_id = $rootScope.usuarioPerfil_id;

        $http.post($rootScope.Servidor + '/listProdutoVenda', $scope.ObjetoVendas).success(listProdutoVendaCallback);
    };

    // akira
    function listProdutoVendaCallback(data, status) {
        console.log('my name is willys campos')
        console.log(data);
        $scope.listaProdutoTabela = data;       
        calculoProduto();
    }

    $scope.definirFormaPagamento = function ($event) {
        
        
        if ($scope.statusFormFormaPagamento) {
            $scope.statusFormFormaPagamento = false;
        } else {
            $scope.statusFormFormaPagamento = true;
        }

        
    };

    $scope.finalizarVenda = function () {

        var dataPedido = $filter('date')($scope.data_pedido, 'yyyy-MM-dd');
        var dataVencimento = $filter('date')($scope.data_vencimento, 'yyyy-MM-dd');
        console.log(dataPedido);
        console.log(dataVencimento);
        $scope.objLancamentoVendaProduto = {};

        $scope.objLancamentoVendaProduto.lav_id = $rootScope.lancamentoVendaId
        $scope.objLancamentoVendaProduto.usp_id = $rootScope.usuarioPerfil_id;
        $scope.objLancamentoVendaProduto.lav_data_pedido = dataPedido;
        $scope.objLancamentoVendaProduto.lav_data_vencimento = dataVencimento;
        $scope.objLancamentoVendaProduto.lav_forma_pagamento = $scope.forma_pagamento;
        $scope.objLancamentoVendaProduto.lav_qtd_parcela = $scope.qtd_parcela;

        console.log($scope.objLancamentoVendaProduto);


        $http.post($rootScope.Servidor + '/finalizarVenda', $scope.objLancamentoVendaProduto).success(finalizarVendaCallback);
    }

    function finalizarVendaCallback(data, status) {

        if (data.error) {
            //$('#msg').append('<p class="alert alert-danger">Erro ! Server error, tente novamente</p>');
        } else {
            dlg = dialogs.notify('Aviso!', 'Venda registrada com sucesso.');
            $location.path('/lancamentoVenda');
        }
    }

    $scope.listarProdutoVendido = function (produtoId) {

        $scope.objProdutoVenda = {
            lap_id: produtoId
        }

        $http.post($rootScope.Servidor + '/listarProdutoVendido', $scope.objProdutoVenda).success(listarProdutoVendidoCallback);
    }

    function listarProdutoVendidoCallback(data, status) {

        if (data.error) {
            //$('#msg').append('<p class="alert alert-danger">Erro ! Server error, tente novamente</p>');

        } else {



        }
    }

    $scope.excluirProdutoLista = function (produtoId) {

        $scope.objProdutoVenda = {
            lap_id: produtoId
        }

        $http.post($rootScope.Servidor + '/excluirProdutoLista', $scope.objProdutoVenda).success(excluirProdutoListaCallback);
    }

    function excluirProdutoListaCallback(data, status) {
        listaProdutoVenda();
    }

    function calculoProduto() {


        var total = 0;
        var valorTotal = 0;

        angular.forEach($scope.listaProdutoTabela, function (todo) {
            valorTotal += todo.PRO_VALOR_VENDA;
        });

        $scope.valorTotalVenda = valorTotal;
    }


    function converteMoedaFloat(valor) {

        if (valor === '') {
            valor = 0;
        } else {
            valor = valor.replace(".", "");
            valor = valor.replace(",", ".");
            valor = parseFloat(valor);
        }
        return valor;

    }
});
