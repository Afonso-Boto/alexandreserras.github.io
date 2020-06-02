$(document).ready(function () {
    e = new Produto("f", "f", "f");
    console.log(e.quantidade);

    e.decrementar();
    console.log(e.quantidade);

    e.incrementar();
    console.log(e.quantidade);

    e.quantidade = 4;
    console.log(e.quantidade);

    $.getJSON("../data/produtos.json", function (json) {
        console.log(json); // this will show the info it in firebug console
    });
});

function ajaxHelper(uri, method, data) {
    self.error(''); // Clear error message
    return $.ajax({
        type: method,
        url: uri,
        dataType: 'json',
        contentType: 'application/json',
        data: data ? JSON.stringify(data) : null,
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("AJAX Call[" + uri + "] Fail...");
            self.error(errorThrown);
        }
    });
}