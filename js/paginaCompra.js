$(document).ready(function () {
	// viewModel - contém os data-binds realizados na página
	var viewModel = {
		displayList: ko.observableArray(),
		tagList: ko.observableArray(),
		displayName: ko.observable("CityFarm"),
		searchTerm: ko.observable(""),
		removeProduto: function (produto) {
			viewModel.displayList.remove(produto);
			localStorage.setItem("car", JSON.stringify(viewModel.displayList()))
		},
		precoTotal: ko.pureComputed(function () {
			var t = 0;
			viewModel.displayList().forEach(function (p) {
				t += p._preco * p._quantidade;
			});
			t = Math.round(t * 100) / 100;
			return t
        }),
        aumentarQuantidade: function (produto) {
            produto._quantidade++;
            $("#dim" + produto._nome).prop("disabled", false);
            localStorage.setItem("car", JSON.stringify(viewModel.displayList()));
            // isto é mesmo parvo mas é o que funciona
            id = "#sp" + event.target.id.substring(3, event.target.id.length);
            var currentText = $(id).text();
            $(id).text(currentText / 1 + 1);
            viewModel.displayList.valueHasMutated();

            // mudar preço
            id = "#pr" + produto._nome;
            $(id).text((Math.round(produto._preco * produto._quantidade * 100) / 100).toFixed(2));
        },
        diminuirQuantidade: function (produto) {
            if (--produto._quantidade == 1)
                $("#dim" + produto._nome).prop("disabled", true);
            localStorage.setItem("car", JSON.stringify(viewModel.displayList()));
            // isto é mesmo parvo mas é o que funciona
            id = "#sp" + event.target.id.substring(3, event.target.id.length);
            var currentText = $(id).text();
            $(id).text(currentText / 1 - 1);
            viewModel.displayList.valueHasMutated();

            // mudar preço
            id = "#pr" + produto._nome;
            $(id).text((Math.round(produto._preco * produto._quantidade * 100) / 100).toFixed(2));
        }
    }


	viewModel.displayList(JSON.parse(localStorage.getItem("car")));
	$("#finaliza").on("click", function () {
		viewModel.displayList.removeAll();
		localStorage.setItem("car", "[]")
	})
   
   $("#logout").click( function(){
	   localStorage.setItem("logged", false);
   })
	
	ko.applyBindings(viewModel);
});

