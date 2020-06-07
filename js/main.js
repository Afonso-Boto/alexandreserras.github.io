
ï»¿$(document).ready(function () {
    // viewModel - contÃ©m os dataBinds realizados na pÃ¡gina
    var viewModel = {
        displayList: ko.observableArray(),
        tagList: ko.observableArray(),
        displayName: ko.observable("CityFarm"),
        searchTerm: ko.observable("")
    }

    // json com a informaÃ§Ã£o dos produtos (nome, preÃ§o, produtor, tags, URL da imagem, descriÃ§Ã£o)
    var json = '[{"nome": "Alface", "preco": 3, "produtor": "Alberto", "tags": ["Vegetal"], "imageURL": "https://extension.umd.edu/sites/extension.umd.edu/files/resize/_images/programs/hgic/Food/salad-4267063_640-600x399.jpg", "descricao": "A alface possui baixo teor calÃ³rico, jÃ¡ que cada a 100 g dela contÃ©m somente 15 calorias. A folha contÃ©m vitamina A, vitamina C , minerais como cÃ¡lcio, fÃ³sforo e ferro. "},' +
        '{"nome": "MaÃ§Ã£", "preco": 2, "produtor": "Alberto", "tags": ["Fruta"], "imageURL": "https://images2.minutemediacdn.com/image/upload/c_fill,g_auto,h_1248,w_2220/v1555925874/shape/mentalfloss/640title_0.jpg", "descricao": "A maÃ§Ã£ possui um excelente valor nutritivo, pois na sua casca encontra-se a pectina que ajuda a reduzir o colesterol do sangue. AlÃ©m disso, Ã© um fruto rico em vitaminas B1, B2,  ferro e fÃ³sforo." },' +
        '{"nome": "BrÃ³culo","preco": 1.5, "produtor": "JosÃ©", "tags": ["Vegetal"], "imageURL": "https://www.earthboundfarm.com/wp-content/uploads/2020/01/EBF_BroccoliFloretsBag-020-2.png", "descricao": "Os brÃ³culos Ã© uma planta crucÃ­fera que pertence Ã  famÃ­lia Brassicaceae. Este vegetal, alÃ©m de possuir poucas calorias (25 calorias em 100 gramas), Ã© cientificamente conhecido por possuir altas concentraÃ§Ãµes de sulforafanos. "}, ' +
        '{"nome":"Morango", "preco": 2, "produtor": "JosÃ©","tags": ["Fruta"],"imageURL":"https://zap.aeiou.pt/wp-content/uploads/2020/04/e5aa2c59b0edc669c43274b9c8f641da-783x450.jpg", "descricao": "Tem poucas calorias, e Ã© uma excelente fonte de vitamina C e potÃ¡ssio, alÃ©m de possuir muitas fibras e poder prevenir certos tipos de cancro."}, ' +
        '{"nome": "Pera", "preco": 1.75, "produtor": "Joana", "tags": ["Fruta"], "imageURL": "https://www.intermarche.pt/media/58926/pera-rocha-02.jpg", "descricao": "Ã‰ rica em sais minerais como, por exemplo, sÃ³dio, potÃ¡ssio, ferro, magnÃ©sio e cÃ¡lcio." }, ' +
        '{"nome": "Cenoura", "preco": 1.65, "produtor": "Joana", "tags": ["Vegetal"], "imageURL": "https://www.greenme.com.br/wp-content/uploads/2015/07/cenouras-beneficios-1200x621.jpg", "descricao": "Pode ser consumida crua ou cozida, em saladas, purÃª,  sumo, sopas e refogados. Cada 100g de cenoura contÃ©m, em mÃ©dia, 51 calorias." }, ' +
        '{"nome": "Tomate", "preco": 1.25, "produtor": "Alberto", "tags": ["Fruta"], "imageURL": "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSX1JUVxmxIZYM1URrRZQQTCDoPPGm_ZaXFkLEB291-nrxb7RtI&usqp=CAU", "descricao": "O tomate Ã© uma fruta, apesar de normalmente ser usado como legume em saladas e pratos quentes. Ã‰ um ingrediente muito utilizado em dietas de emagrecimento porque cada tomate tem apenas 25 calorias, e tem propriedades diurÃ©ticas, alÃ©m de muita Ã¡gua e vitamina C que melhora o sistema imune e a absorÃ§Ã£o do ferro nas refeiÃ§Ãµes." }, ' +
        '{"nome": "PÃªssego", "preco": 2.5, "produtor": "JosÃ©", "tags": ["Fruta"], "imageURL": "https://1.bp.blogspot.com/-3hmrYnf7tg8/Txgfb6P4WHI/AAAAAAAAEbo/TlsY5Ty_Mtg/s1600/pessego.jpg", "descricao": "O pÃªssego pode ser classificado em dois grupos: o de polpa amarela e o de polpa branca, cada um tendo as variedades de caroÃ§o solto e caroÃ§o aderente. Assim sendo, o pÃªssego, dependendo da variedade, pode ter forma redonda ou oval, casca com pilosidade, de cor que varia entre amarelo e o vermelho. A polpa Ã© suculenta, agridoce, aromÃ¡tica e de cor amarela, branca ou avermelhada" }, ' +
        '{"nome": "Alho-FrancÃªs", "preco": 1.89, "produtor": "JosÃ©", "tags": ["Vegetal"], "imageURL": "https://i0.wp.com/revistajardins.pt/wp-content/uploads/2018/01/ThinkstockPhotos-636978920.jpg?fit=1080%2C670&ssl=1" , "descricao": "Com um sabor caracterÃ­stico, que faz lembrar as chalotas, mas mais doce e subtil, o alho francÃªs e a cebola substituem-se quando nÃ£o hÃ¡ colheita de alho francÃªs (de maio a agosto), hÃ¡ colheita da cebola (de junho a setembro) e vice-versa."},' +
        '{"nome": "AbÃ³bora", "preco": 1, "produtor": "Joana", "tags": ["Fruta"], "imageURL": "https://lh3.googleusercontent.com/proxy/JZUEVVC3nXIGp0XA_RcSfSVR8esxHqyKxoaCksVibxZCRkjQJ_MM5gSW2ZTcgR5GOcJgvCV8TuVN76vdcE5yTPbTuaZM7xtyIvFkhFUEgBCjH0mA-_qZfFNrjGGF4akgSEyY1wHlNiceM_0pJ4frzmHRt5JQfA", "descricao": "A abÃ³bora, tambÃ©m conhecida como jerimum, Ã© um legume muito utilizado em preparaÃ§Ãµes culinÃ¡rias que traz como principal vantagem ter pouco carboidrato e poucas calorias, ajudando a emagrecer e controlar o peso. Assim, tanto a abÃ³bora cabotian quanto a abÃ³bora moranga sÃ£o Ã³timas aliadas da dieta e nÃ£o engordam." }, ' +
        '{"nome": "Kiwi", "preco": 3, "produtor": "Alberto", "tags": ["Fruta"], "imageURL": "https://cdn-cv.r4you.co/wp-content/uploads/2018/11/iStock-1056258314.jpg", "descricao": "Fonte de fibras e de proteÃ­nas, o kiwi tem um valor nutricional gigantesco, alÃ©m de ser uma fruta com baixas calorias, a torna eficaz tambÃ©m para as pessoas que desejam perder peso. Outra vantagem desse alimento Ã© que ele Ã© naturamente orgÃ¢nico e estÃ¡ na lista dos frutos que mais resistem a muitos dos resÃ­duos de pesticidas." }, ' +
        '{"nome": "Pimento-Vermelho", "preco": 2.1, "produtor": "Joana", "tags": ["Vegetal"], "imageURL": "https://media.continente.pt/Sonae.eGlobal.Presentation.Web.Media/media.axd?resourceSearchType=2&resource=ProductId=2076826(eCsf$RetekProductCatalog$MegastoreContinenteOnline$Continente)&siteId=1&channelId=1&width=512&height=512&defaultOptions=1", "descricao": "Estes fazem parte da cultura gastronÃ³mica nacional e o seu consumo pode trazer diversos benefÃ­cios para a saÃºde, nomeadamente na proteÃ§Ã£o contra doenÃ§as cardiovasculares e cancro, graÃ§as ao seu poder antioxidante, relacionado com a sua elevada concentraÃ§Ã£o de vitamina C e carotenos. O pimento Ã© igualmente rico em vitamina A, vitamina B6, fitoquÃ­micos, fibra e potÃ¡ssio." }, ' +
        '{"nome": "Melancia", "preco": 1, "produtor": "Alberto", "tags": ["Fruta"], "imageURL": "https://bonfruto.com.br/wp-content/uploads/2020/03/022550_Ampliada.jpg", "descricao": " Mas os benefÃ­cios da melancia nÃ£o sÃ£o apenas sabor e hidrataÃ§Ã£o. Com apenas 46 calorias por 100 gramas a melancia Ã© rica em vitamina C, vitamina A, licopeno, entre outros compostos que proporcionam benefÃ­cios para a saÃºde " }, ' +
        '{"nome": "LimÃ£o", "preco": 2, "produtor": "Joana", "tags": ["Fruta"], "imageURL": "https://lh3.googleusercontent.com/proxy/KiU_leemVEi9MpvIja9K4RNj453ImIHTXctbQnmH_MGEBvHoDblEFb5jpH2-AOo2aGQEn0Gs0U6n0-qKwbdTI4Vy5T2vQarr6abVkBfI5fjA3aLyB6gatZ04tMpC5FeS6MrFmwPK", "descricao": " O limÃ£o Ã© um fruto rico em vitamina C e em 100 gramas possui, apenas, 26 calorias. SÃ£o muitos os proveitos resultantes do seu consumo, que podem ser obtidos atravÃ©s do sumo, da polpa ou das raspas da casca, rica em Ã³leos essenciais. " }, ' +
        '{"nome": "Laranja", "preco": 1.99, "produtor": "JosÃ©", "tags": ["Fruta"], "imageURL": "https://www.ativosaude.com/uploads/2018/07/17091948/pe-de-laranja.jpg", "descricao": " A sua doÃ§ura natural e a variedade das utilizaÃ§Ãµes, ao natural, em sumo ou em compotas, contribuÃ­ram para a sua diversificaÃ§Ã£o. Fique a conhecer a sua composiÃ§Ã£o nutricional, benefÃ­cios para a saÃºde e conselhos de consumo das laranjas. "}]';

    // leitura inicial do json
    var parsed = JSON.parse(json);

    // lista de todos os produtos disponÃ­veis
    var produtos = [];
    // adicionar produtos lidos do json Ã  lista de produtos como objetos da classe Produto
    // ao mesmo tempo determina-se todos os tags diferentes que existem
    for (p in parsed) {
        produtos.push(new Produto(parsed[p].nome, parsed[p].preco, parsed[p].produtor, parsed[p].tags, parsed[p].imageURL, parsed[p].descricao));
        parsed[p].tags.forEach(function (t) {
            if (!viewModel.tagList().includes(t))
                viewModel.tagList.push(t);
        });
    }

    console.log(produtos);
    //console.log(viewModel.tagList());

    // inicializaÃ§Ã£o da lista de produtos exibida
    viewModel.displayList(produtos);

    // lista dos produtos que correspondem Ã  pesquisa
    var searchResults = produtos;

    // pesquisar ao premir Enter no campo de pesquisa
    $("#search").keydown(function () {
        if (event.which == 13) {
            // fazer a pesquisa
            search(this.value);
        }
    });
    // pesquisar ao clicar no botÃ£o de pesquisa
    $("#searchButton").click(function () {
        // fazer a pesquisa
        search($("#search").val());
    });

    // limpar pesquisa
    $("#clean").click(function () {
        // a limpeza da pesquisa Ã© feita pela pesquisa com o termo "", que dÃ¡ match a todos os produtos
        search("");
    });

    // funÃ§Ã£o encargue da pesquisa
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

    // funÃ§Ã£o encargue de filtrar os produtos por tag
    filterByTag = function () {
        var tag = $("#tagSelect").val();
        // sem filtro, mostrar todos os produtos
        if (tag == "all")
            viewModel.displayList(searchResults);
        // com filtro, mostrar apenas os que correspondem Ã  tag
        else {
            var filtered = searchResults.filter(function (p) {
                return p.tags.includes(tag);
            });
            viewModel.displayList(filtered);
        }
    }

    ko.applyBindings(viewModel);
});

// FunÃ§Ã£o para Smooth Scrolling
// Todos os links com #
$('a[href*="#"]')

    // Remover links que nÃ£o vÃ£o a lado nenhum
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function (event) {
        // Links na mesma pÃ¡gina
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
                    // Callback depois da animaÃ§Ã£o
                    // Mudar o foco
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) { // Verificar se o alvo estÃ¡ focado
                        return false;
                    } else {
                        $target.attr('tabindex', '-1'); // Tabindex para elementos nÃ£o focÃ¡veis
                        $target.focus(); // Definir foco outra vez
                    };
                });
            }
        }
    });

