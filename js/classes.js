class Cliente {
    constructor(nome, email, morada, telemovel, detPagamento) {
        this._nome = nome;
        this._email = email;
        this._morada = morada;
        this._telemovel = telemovel;
        this._detPagamento = detPagamento;
    }

    get nome() {
        return this._nome;
    }
    get email() {
        return this._email;
    }
    get morada() {
        return this._morada;
    }
    get telemovel() {
        return this._telemovel;
    }
    get detPagamento() {
        return this._detPagamento;
    }
}

class Produtor {
    constructor(nome, email, morada, telemovel) {
        this._nome = nome;
        this._email = email;
        this._morada = morada;
        this._telemovel = telemovel;
    }

    get nome() {
        return this._nome;
    }
    get email() {
        return this._email;
    }
    get morada() {
        return this._morada;
    }
    get telemovel() {
        return this._telemovel;
    }
}

class Estafeta {
    constructor(nome, localizacao, telemovel) {
        this._nome = nome;
        this._localizacao = localizacao;
        this._telemovel = telemovel;
    }

    get nome() {
        return this._nome;
    }
    get localizacao() {
        return this._localizacao;
    }
    get telemovel() {
        return this._telemovel;
    }
}

class Produto {
    constructor(nome, preco, produtor) {
        this._nome = nome;
        this._preco = preco;
        this._produtor = produtor;
        this._quantidade = 0;
    }

    get nome() {
        return this._nome;
    }
    get quantidade() {
        return this._quantidade;
    }
    get preco() {
        return this._preco;
    }

    set quantidade(q) {
        this._quantidade = q;
    }

    incrementar = function () {
        this._quantidade++;
    }
    decrementar = function () {
        if (this._quantidade > 0)
            this._quantidade--;
    }
}

class Encomenda {
    constructor(id, cesto, localizacao, cliente) {
        this._id = id;
        this._cesto = cesto;
        this._localizacao = localizacao;
        this._cliente = cliente;
    }

    get id() {
        return this._id;
    }
    get cesto() {
        return this._cesto;
    }
    get localizacao() {
        return this._localizacao;
    }
    get cliente() {
        return this._cliente;
    }
}

class Entrega {
    constructor() {
        this._entregue = false;
    }

    entregar = function () {
        this._entregue = true;
    }

    get entregue() {
        return this._entregue;
    }
}

class Localizacao {
    constructor() { }
}