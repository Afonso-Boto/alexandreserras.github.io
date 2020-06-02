$(document).ready(function () {
    e = new Produto("f", "f", "f");
    console.log(e.quantidade);

    e.decrementar();
    console.log(e.quantidade);

    e.incrementar();
    console.log(e.quantidade);

    e.quantidade = 4;
    console.log(e.quantidade);

    var produtos = [];

    $.getJSON("../data/produtos.json", function (json) {
        for (p in json) {
            produtos.push(new Produto(p.nome, p.preco, p.produtor, p.tags));
        }
    });

    console.log(produtos);
    console.log(produtos.length);
});