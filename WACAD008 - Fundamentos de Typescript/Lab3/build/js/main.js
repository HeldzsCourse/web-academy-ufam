"use strict";
class Produto {
    constructor(id, modelo, fabricante, valor) {
        this._id = id;
        this._modelo = modelo;
        this._fabricante = fabricante;
        this._valor = valor;
    }
    get id() {
        return this._id;
    }
    get modelo() {
        return this._modelo;
    }
    set modelo(modelo) {
        this._modelo = modelo;
    }
    get fabricante() {
        return this._fabricante;
    }
    set fabricante(fabricante) {
        this._fabricante = fabricante;
    }
    get valor() {
        return this._valor;
    }
    set valor(valor) {
        this._valor = valor;
    }
}
class TV extends Produto {
    constructor(id, modelo, fabricante, valor, resolucao, tamanhoEmPolegadas) {
        super(id, modelo, fabricante, valor);
        this._resolucao = resolucao;
        this._tamanhoEmPolegadas = tamanhoEmPolegadas;
    }
    get resolucao() {
        return this._resolucao;
    }
    set resolucao(resolucao) {
        this._resolucao = resolucao;
    }
    get tamanhoEmPolegadas() {
        return this._tamanhoEmPolegadas;
    }
    set tamanhoEmPolegadas(tamanhoEmPolegadas) {
        this._tamanhoEmPolegadas = tamanhoEmPolegadas;
    }
}
class Celular extends Produto {
    constructor(id, modelo, fabricante, valor, memoria) {
        super(id, modelo, fabricante, valor);
        this._memoria = memoria;
    }
    get memoria() {
        return this._memoria;
    }
    set memoria(memoria) {
        this._memoria = memoria;
    }
}
class Bicicleta extends Produto {
    constructor(id, modelo, fabricante, valor, tamanhoDoAro) {
        super(id, modelo, fabricante, valor);
        this._tamanhoDoAro = tamanhoDoAro;
    }
    get tamanhoDoAro() {
        return this._tamanhoDoAro;
    }
    set tamanhoDoAro(tamanhoDoAro) {
        this._tamanhoDoAro = tamanhoDoAro;
    }
}
class Carrinho {
    constructor() {
        this._itens = [];
    }
    adicionar(produto) {
        this._itens.push(produto);
    }
    remover(id) {
        this._itens = this._itens.filter((item) => item.id !== id);
    }
    listarItens() {
        return this._itens;
    }
    calcularTotal() {
        return this._itens.reduce((total, item) => total + item.valor, 0);
    }
}
const meuCarrinho = new Carrinho();
let produtosDaLoja = [
    new TV(1, 'Vision', 'Samsung', 2049.00, '4K', 43),
    new TV(2, 'Evo', 'LG', 6999.00, '4K', 55),
    new Celular(3, 'Poco X5', 'Xiaomi', 2000.00, '128GB'),
    new Celular(4, 'S24 Ultra', 'Samsung', 5499.00, '512GB'),
    new Bicicleta(5, 'Caloi Explorer', 'Caloi', 2499.00, 29),
    new Bicicleta(6, 'Sense One', 'Caloi', 2799.00, 29),
];
const divProdutos = document.getElementById('produtos-disponiveis');
const divCarrinho = document.getElementById('carrinho-itens');
const spanTotal = document.getElementById('carrinho-total');
const atualizarDisplay = () => {
    divProdutos.innerHTML = '';
    divCarrinho.innerHTML = '';
    produtosDaLoja.forEach((produto) => {
        const itemElement = document.createElement('div');
        let otherInfo = '';
        if (produto instanceof TV) {
            otherInfo = `Resolução: ${produto.resolucao}, ${produto.tamanhoEmPolegadas}"`;
        }
        else if (produto instanceof Celular) {
            otherInfo = `Armazenamento: ${produto.memoria}`;
        }
        else if (produto instanceof Bicicleta) {
            otherInfo = `Aro: ${produto.tamanhoDoAro}`;
        }
        ;
        itemElement.className = 'list-group-item';
        itemElement.innerHTML = `
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <h5 class="mb-1">${produto.modelo} (${produto.fabricante}) - ${otherInfo}</h5> 
          <p class="mb-1"><strong>R$ ${produto.valor.toFixed(2)}</strong></p>
        </div>
        <button class="btn btn-primary btn-adicionar">Adicionar</button>
      </div>
    `;
        const botaoAdicionar = itemElement.querySelector('.btn-adicionar');
        botaoAdicionar.addEventListener('click', () => {
            meuCarrinho.adicionar(produto);
            atualizarDisplay();
        });
        divProdutos.appendChild(itemElement);
    });
    meuCarrinho.listarItens().forEach((element) => {
        const itemCarrinho = document.createElement('div');
        itemCarrinho.className = 'list-group-item';
        itemCarrinho.innerHTML = `
      <div class="d-flex flex-row justify-content-between align-content-center">
        <div>
          <h5 class="mb-1">${element.modelo} (${element.fabricante})</h5>
          <p class="mb-1"><strong>R$ ${element.valor.toFixed(2)}</strong></p>
        </div>
        <button class="btn btn-remover">X</button>
      </div>
    `;
        const botaoRemover = itemCarrinho.querySelector('.btn-remover');
        botaoRemover.addEventListener('click', () => {
            meuCarrinho.remover(element.id);
            atualizarDisplay();
        });
        divCarrinho.appendChild(itemCarrinho);
    });
    spanTotal.textContent = `R$ ${meuCarrinho.calcularTotal().toFixed(2)}`;
};
atualizarDisplay();
