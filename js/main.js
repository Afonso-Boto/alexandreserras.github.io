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
				t += p.preco * p.quantidade;
			});
			return t
		})
	}

	// json com a informação dos produtos (nome, preço, produtor, tags, URL da imagem, descrição)
	var json = '[{"nome": "Alface", "preco": 3, "produtor": "Alberto", "tags": ["Vegetal"], "imageURL": "https://extension.umd.edu/sites/extension.umd.edu/files/resize/_images/programs/hgic/Food/salad-4267063_640-600x399.jpg", "descricao": "ummm não sei o que por aqui"},' +
		'{"nome": "Maçã", "preco": 2, "produtor": "Alberto", "tags": ["Fruta"], "imageURL": "https://images2.minutemediacdn.com/image/upload/c_fill,g_auto,h_1248,w_2220/v1555925874/shape/mentalfloss/640title_0.jpg", "descricao": "a segunda descrição onde não sei o que por :^)" },' +
		'{"nome": "Bróculos","preco": 1.5, "produtor": "José", "tags": ["Vegetal"], "imageURL": "https://www.earthboundfarm.com/wp-content/uploads/2020/01/EBF_BroccoliFloretsBag-020-2.png", "descricao": "wow quem diria uma terceira descrição, absolutamente genial, bravo, poesia em movimento"}]';

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