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
            return t
        })
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