var imgFormat = (function () {

    function convertByteString(imgByte) {

        if (imgByte == null)
            return '';

        var a = new Uint8Array(imgByte);
        var nb = a.length;
        var img;
        var parametro = 'data:image/jpeg;base64,';
        var base64;

        if (nb < 4)
            return "";

        var binary = "";
        for (var i = 0; i < nb; i++) {
            binary += String.fromCharCode(a[i]);
        }
        img = window.btoa(binary);
        base64 = parametro + img;
        return base64;
    }

    return {
        convertByteString: convertByteString
    }

}());

app.controller('HomeController', function ($rootScope, $scope, $http, $location) {
    // init
       

    $scope.record = {
        
    };

    
    $http.get($rootScope.Servidor + '/getimage').success(confirmaCallback);    

    function confirmaCallback(data, status) {

        
        console.log(data[0].doc_documento.data);
        var lImage = imgFormat.convertByteString(data[0].doc_documento.data);
        //alert(lImage);
        //;var file = new Blob([data.doc_documento], { type: 'image/jpeg' });
        
        $scope.full = lImage;
        console.log(lImage);


    }

});