$(document).ready(function () {
    var produtos = [];

    var json = '[{"nome": "Alface","preco": 3,"produtor": "Alberto","tags": ["Vegetal"]},' +
            '{ "nome": "Maçã", "preco": 2, "produtor": "Alberto", "tags": ["Fruta"] }]';

    var parsed = JSON.parse(json);

    for (p in parsed) {
        produtos.push(new Produto(parsed[p].nome, parsed[p].preco, parsed[p].produtor, parsed[p].tags));
    }

    console.log(produtos);
});