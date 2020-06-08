$(document).ready(function () {
    // viewModel - contém os dataBinds realizados na página
    var viewModel = {
        displayList: ko.observableArray(),
        tagList: ko.observableArray(),
        displayName: ko.observable("CityFarm"),
        searchTerm: ko.observable(""),
        displayCarr: ko.observableArray(),

        precoTotal: ko.pureComputed(function () {
            var t = 0;
            viewModel.displayCarr().forEach(function (p) {
                t += p._preco * p._quantidade;
            });
            t = Math.round(t * 100) / 100;
            return t
        })
    }
    
    
    // json com a informação dos produtos (nome, preço, produtor, tags, URL da imagem, descrição)
    var json = '[{"nome": "Alface", "preco": 0.8, "produtor": "Alberto", "tags": ["Vegetal"], "imageURL": "https://extension.umd.edu/sites/extension.umd.edu/files/resize/_images/programs/hgic/Food/salad-4267063_640-600x399.jpg", "descricao": "A alface possui baixo teor calórico, já que cada a 100 g dela contém somente 15 calorias. A folha contém vitamina A, vitamina C , minerais como cálcio, fósforo e ferro. "},' +
        '{"nome": "Maçã", "preco": 0.3, "produtor": "Alberto", "tags": ["Fruta"], "imageURL": "https://images2.minutemediacdn.com/image/upload/c_fill,g_auto,h_1248,w_2220/v1555925874/shape/mentalfloss/640title_0.jpg", "descricao": "A maçã possui um excelente valor nutritivo, pois na sua casca encontra-se a pectina que ajuda a reduzir o colesterol do sangue. Além disso, é um fruto rico em vitaminas B1, B2,  ferro e fósforo." },' +
        '{"nome": "Bróculo","preco": 0.15, "produtor": "José", "tags": ["Vegetal"], "imageURL": "https://www.earthboundfarm.com/wp-content/uploads/2020/01/EBF_BroccoliFloretsBag-020-2.png", "descricao": "Os bróculos é uma planta crucífera que pertence à família Brassicaceae. Este vegetal, além de possuir poucas calorias (25 calorias em 100 gramas), é cientificamente conhecido por possuir altas concentrações de sulforafanos. "}, ' +
        '{"nome":"Morango", "preco": 0.05, "produtor": "José","tags": ["Fruta"],"imageURL":"https://zap.aeiou.pt/wp-content/uploads/2020/04/e5aa2c59b0edc669c43274b9c8f641da-783x450.jpg", "descricao": "Tem poucas calorias, e é uma excelente fonte de vitamina C e potássio, além de possuir muitas fibras e poder prevenir certos tipos de cancro."}, ' +
        '{"nome": "Pera", "preco": 0.4, "produtor": "Joana", "tags": ["Fruta"], "imageURL": "https://www.intermarche.pt/media/58926/pera-rocha-02.jpg", "descricao": "É rica em sais minerais como, por exemplo, sódio, potássio, ferro, magnésio e cálcio." }, ' +
        '{"nome": "Cenoura", "preco": 0.25, "produtor": "Joana", "tags": ["Vegetal"], "imageURL": "https://www.greenme.com.br/wp-content/uploads/2015/07/cenouras-beneficios-1200x621.jpg", "descricao": "Pode ser consumida crua ou cozida, em saladas, purê,  sumo, sopas e refogados. Cada 100g de cenoura contém, em média, 51 calorias." }, ' +
        '{"nome": "Tomate", "preco": 0.3, "produtor": "Alberto", "tags": ["Fruta"], "imageURL": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSX1JUVxmxIZYM1URrRZQQTCDoPPGm_ZaXFkLEB291-nrxb7RtI&usqp=CAU", "descricao": "O tomate é uma fruta, apesar de normalmente ser usado como legume em saladas e pratos quentes. É um ingrediente muito utilizado em dietas de emagrecimento porque cada tomate tem apenas 25 calorias, e tem propriedades diuréticas, além de muita água e vitamina C que melhora o sistema imune e a absorção do ferro nas refeições." }, ' +
        '{"nome": "Pêssego", "preco": 0.35, "produtor": "José", "tags": ["Fruta"], "imageURL": "https://1.bp.blogspot.com/-3hmrYnf7tg8/Txgfb6P4WHI/AAAAAAAAEbo/TlsY5Ty_Mtg/s1600/pessego.jpg", "descricao": "O pêssego pode ser classificado em dois grupos: o de polpa amarela e o de polpa branca, cada um tendo as variedades de caroço solto e caroço aderente. Assim sendo, o pêssego, dependendo da variedade, pode ter forma redonda ou oval, casca com pilosidade, de cor que varia entre amarelo e o vermelho. A polpa é suculenta, agridoce, aromática e de cor amarela, branca ou avermelhada" }, ' +
        '{"nome": "Alho-Francês", "preco": 0.5, "produtor": "José", "tags": ["Vegetal"], "imageURL": "https://i0.wp.com/revistajardins.pt/wp-content/uploads/2018/01/ThinkstockPhotos-636978920.jpg?fit=1080%2C670&ssl=1" , "descricao": "Com um sabor característico, que faz lembrar as chalotas, mas mais doce e subtil, o alho francês e a cebola substituem-se quando não há colheita de alho francês (de maio a agosto), há colheita da cebola (de junho a setembro) e vice-versa."},' +
        '{"nome": "Alho-Francês", "preco": 0.5, "produtor": "José", "tags": ["Vegetal"], "imageURL": "https://i0.wp.com/revistajardins.pt/wp-content/uploads/2018/01/ThinkstockPhotos-636978920.jpg?fit=1080%2C670&ssl=1" , "descricao": "Com um sabor característico, que faz lembrar as chalotas, mas mais doce e subtil. O alho francês e a cebola substituem-se quando não há colheita de alho francês (de maio a agosto), há colheita da cebola (de junho a setembro) e vice-versa."},' +
        '{"nome": "Abóbora", "preco": 1.59, "produtor": "Joana", "tags": ["Fruta"], "imageURL": "https://lh3.googleusercontent.com/proxy/JZUEVVC3nXIGp0XA_RcSfSVR8esxHqyKxoaCksVibxZCRkjQJ_MM5gSW2ZTcgR5GOcJgvCV8TuVN76vdcE5yTPbTuaZM7xtyIvFkhFUEgBCjH0mA-_qZfFNrjGGF4akgSEyY1wHlNiceM_0pJ4frzmHRt5JQfA", "descricao": "A abóbora, também conhecida como jerimum, é um legume muito utilizado em preparações culinárias que traz como principal vantagem ter pouco carboidrato e poucas calorias. Deste modo, ajuda a emagrecer e controlar o peso. Assim, tanto a abóbora cabotian quanto a abóbora moranga são ótimas aliadas da dieta e não engordam." }, ' +
        '{"nome": "Kiwi", "preco": 0.7, "produtor": "Alberto", "tags": ["Fruta"], "imageURL": "https://cdn-cv.r4you.co/wp-content/uploads/2018/11/iStock-1056258314.jpg", "descricao": "Fonte de fibras e de proteínas, o kiwi tem um valor nutricional gigantesco, além de ser uma fruta com baixas calorias, a torna eficaz também para as pessoas que desejam perder peso. Outra vantagem desse alimento é que ele é naturamente orgânico e está na lista dos frutos que mais resistem a muitos dos resíduos de pesticidas." }, ' +
        '{"nome": "Pimento-Vermelho", "preco": 0.79, "produtor": "Joana", "tags": ["Vegetal"], "imageURL": "https://media.continente.pt/Sonae.eGlobal.Presentation.Web.Media/media.axd?resourceSearchType=2&resource=ProductId=2076826(eCsf$RetekProductCatalog$MegastoreContinenteOnline$Continente)&siteId=1&channelId=1&width=512&height=512&defaultOptions=1", "descricao": "Estes fazem parte da cultura gastronómica nacional e o seu consumo pode trazer diversos benefícios para a saúde. Nomeadamente na proteção contra doenças cardiovasculares e cancro, graças ao seu poder antioxidante, relacionado com a sua elevada concentração de vitamina C e carotenos. O pimento é igualmente rico em vitamina A, vitamina B6, fitoquímicos, fibra e potássio." }, ' +
        '{"nome": "Melancia", "preco": 2, "produtor": "Alberto", "tags": ["Fruta"], "imageURL": "https://bonfruto.com.br/wp-content/uploads/2020/03/022550_Ampliada.jpg", "descricao": " Mas os benefícios da melancia não são apenas sabor e hidratação. Com apenas 46 calorias por 100 gramas a melancia é rica em vitamina C, vitamina A, licopeno, entre outros compostos que proporcionam benefícios para a saúde " }, ' +
        '{"nome": "Limão", "preco": 0.3, "produtor": "Joana", "tags": ["Fruta"], "imageURL": "https://lh3.googleusercontent.com/proxy/KiU_leemVEi9MpvIja9K4RNj453ImIHTXctbQnmH_MGEBvHoDblEFb5jpH2-AOo2aGQEn0Gs0U6n0-qKwbdTI4Vy5T2vQarr6abVkBfI5fjA3aLyB6gatZ04tMpC5FeS6MrFmwPK", "descricao": " O limão é um fruto rico em vitamina C e em 100 gramas possui, apenas, 26 calorias. São muitos os proveitos resultantes do seu consumo, que podem ser obtidos através do sumo, da polpa ou das raspas da casca, rica em óleos essenciais. " }, ' +
        '{"nome": "Laranja", "preco": 0.70, "produtor": "José", "tags": ["Fruta"], "imageURL": "https://www.ativosaude.com/uploads/2018/07/17091948/pe-de-laranja.jpg", "descricao": " A sua doçura natural e a variedade das utilizações, ao natural, em sumo ou em compotas, contribuíram para a sua diversificação. Fique a conhecer a sua composição nutricional, benefícios para a saúde e conselhos de consumo das laranjas. "}]';

    // leitura inicial do json
    var parsed = JSON.parse(json);

    // lista de todos os produtos disponíveis
    var produtoAtual;
    var produtoSelect;
    var produtos = [];
    // adicionar produtos lidos do json à lista de produtos como objetos da classe Produto
    // ao mesmo tempo determina-se todos os tags diferentes que existem
    for (p in parsed) {
        prod = new Produto(parsed[p].nome, parsed[p].preco, parsed[p].produtor, parsed[p].tags, parsed[p].imageURL, parsed[p].descricao);
        prod.quantidade = Math.floor(Math.random() * 200) + 50;
        produtos.push(prod);
        parsed[p].tags.forEach(function (t) {
            if (!viewModel.tagList().includes(t))
                viewModel.tagList.push(t);
        });
    }

    //console.log(produtos);
    //console.log(viewModel.tagList());

    // inicialização da lista de produtos exibida
    viewModel.displayList(produtos);
  //  viewModel.displayCarr(JSON.parse(localStorage.getItem("car")))
    
   
    // lista dos produtos que correspondem à pesquisa
    var searchResults = produtos;

    // pesquisar ao premir Enter no campo de pesquisa
    $("#search").keydown(function () {
        if (event.which == 13) {
            // fazer a pesquisa
            search(this.value);
        }
    });
    // pesquisar ao clicar no botão de pesquisa
    $("#searchButton").click(function () {
        // fazer a pesquisa
        search($("#search").val());
    });

    // limpar pesquisa
    $("#clean").click(function () {
        // a limpeza da pesquisa é feita pela pesquisa com o termo "", que dá match a todos os produtos
        search("");
    });

    // função encargue da pesquisa
    search = function (termo) {
        searchResults = produtos.filter(function (p) { return p.nome.toLowerCase().includes(termo.toLowerCase()) });
        viewModel.searchTerm(termo);
        if (termo == "") {
            $("#listHeader").text("Produtos Populares");
            $("title").html("CityFarm");
            $("#clean").hide();
        }
        else {
            $("#listHeader").text("Resultados:");
            $("title").html("CityFarm - " + termo);
            $("#clean").show();
        }
        // reiniciar filtro
        $("#tagSelect").val("all");
        filterByTag();
    }


    // Filtrar os resultados atuais ao selecionar um tag
    $("#tagSelect").on('change', function () {
        filterByTag()
    });

    // função encargue de filtrar os produtos por tag
    filterByTag = function () {
        var tag = $("#tagSelect").val();
        // sem filtro, mostrar todos os produtos
        if (tag == "all")
            viewModel.displayList(searchResults);
        // com filtro, mostrar apenas os que correspondem à tag
        else {
            var filtered = searchResults.filter(function (p) {
                return p.tags.includes(tag);
            });
            viewModel.displayList(filtered);
        }
    }

    ShowProduto = function (produto) {
        console.log("Show Produto:");

        produtoAtual = new Produto(produto._nome, produto._preco, produto._produtor, produto._tags, produto._imageURL, produto._descricao);
        produtoSelect = produto;

        $("#imgProduto").attr("src", produto._imageURL);

        $("#exampleModalLongTitle").html(produto._nome);

        $("#vmProdutoProdutor").html("Produtor: " + produto._produtor);
        $("#vmProdutoDescricao").html("Descrição: " + produto._descricao);

        $("#vmProdutoQuantidade").html("Quantidade: " + produto._quantidade);
        $("#vmProdutoPreco").html("Preço: " + produto._preco + "€");

        $("#inputQuantidade").attr("max", produto._quantidade);
    }

    $("#addCarr").on("click", function () {
        produtoAtual.quantidade = $("#inputQuantidade").val();
        if (produtoAtual.quantidade > 0 && produtoAtual.quantidade <= produtoSelect._quantidade) {
            produtoSelect.quantidade -= produtoAtual._quantidade;
            viewModel.displayCarr.push(produtoAtual);
            localStorage.setItem("car", JSON.stringify(viewModel.displayCarr()));
        }

    });

    ko.applyBindings(viewModel);
});


// Função para Smooth Scrolling
// Todos os links com #
$('a[href*="#"]')
    // Remover links que não vão a lado nenhum
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function (event) {
        // Links na mesma página
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
            &&
            location.hostname == this.hostname
        ) {
            // Ver que elemento vai ser o alvo
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            // Existe alvo para o scroll?
            if (target.length) {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000, function () {
                    // Callback depois da animação
                    // Mudar o foco
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) { // Verificar se o alvo está focado
                        return false;
                    } else {
                        $target.attr('tabindex', '-1'); // Tabindex para elementos não focáveis
                        $target.focus(); // Definir foco outra vez
                    };
                });
            }
        }
    });
