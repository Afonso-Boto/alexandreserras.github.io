$(document).ready(function () {
    var produtos = [];
    var tags = new Set();

    var json = '[{"nome": "Alface", "preco": 3, "produtor": "Alberto", "tags": ["Vegetal"], "imageURL": "https://extension.umd.edu/sites/extension.umd.edu/files/resize/_images/programs/hgic/Food/salad-4267063_640-600x399.jpg", "descricao": "ummm não sei o que por aqui"},' +
        '{"nome": "Maçã", "preco": 2, "produtor": "Alberto", "tags": ["Fruta"], "imageURL": "https://images2.minutemediacdn.com/image/upload/c_fill,g_auto,h_1248,w_2220/v1555925874/shape/mentalfloss/640title_0.jpg", "descricao": "ummm não sei o que por aqui" },' +
        '{"nome": "Bróculos","preco": 1.5, "produtor": "José", "tags": ["Vegetal"], "imageURL": "https://www.earthboundfarm.com/wp-content/uploads/2020/01/EBF_BroccoliFloretsBag-020-2.png", "descricao": "ummm não sei o que por aqui"}]';

    var parsed = JSON.parse(json);


    for (p in parsed) {
        produtos.push(new Produto(parsed[p].nome, parsed[p].preco, parsed[p].produtor, parsed[p].tags, parsed[p].imageURL, parsed[p].descricao));
        
    }

    console.log(produtos);

    displayList = ko.observableArray(produtos);


    ko.applyBindings();
});