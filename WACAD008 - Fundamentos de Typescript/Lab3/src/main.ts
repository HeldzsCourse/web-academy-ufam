// Classe Produto como geralizadora de TV, Celular e Bicicleta
abstract class Produto {
  private _id: number;
  private _modelo: string;
  private _fabricante: string;
  private _valor: number;

  constructor(id: number, modelo: string, fabricante: string, valor: number) {
    this._id = id;
    this._modelo = modelo;
    this._fabricante = fabricante;
    this._valor = valor;
  }

  public get id(): number {
    return this._id;
  }

  public get modelo(): string {
    return this._modelo;
  }
  public set modelo(modelo: string) {
    this._modelo = modelo;
  }

  public get fabricante(): string {
    return this._fabricante;
  }
  public set fabricante(fabricante: string) {
    this._fabricante = fabricante;
  }

  public get valor(): number {
    return this._valor;
  }
  public set valor(valor: number) {
    this._valor = valor;
  }
}

// Implementação das classes TV, Celular e Bicliceta. Especializando Produto
class TV extends Produto {
  private _resolucao: string;
  private _tamanhoEmPolegadas: number;

  constructor(
    id: number,
    modelo: string,
    fabricante: string,
    valor: number,
    resolucao: string,
    tamanhoEmPolegadas: number
  ) {
    super(id, modelo, fabricante, valor);
    this._resolucao = resolucao;
    this._tamanhoEmPolegadas = tamanhoEmPolegadas;
  }

  public get resolucao(): string {
    return this._resolucao;
  }
  public set resolucao(resolucao: string) {
    this._resolucao = resolucao;
  }

  public get tamanhoEmPolegadas(): number {
    return this._tamanhoEmPolegadas;
  }
  public set tamanhoEmPolegadas(tamanhoEmPolegadas: number) {
    this._tamanhoEmPolegadas = tamanhoEmPolegadas;
  }
}

class Celular extends Produto {
  private _memoria: string;

  constructor(
    id: number,
    modelo: string,
    fabricante: string,
    valor: number,
    memoria: string
  ) {
    super(id, modelo, fabricante, valor);

    this._memoria = memoria;
  }

  public get memoria(): string {
    return this._memoria;
  }

  public set memoria(memoria: string) {
    this._memoria = memoria;
  }
}

class Bicicleta extends Produto {
  private _tamanhoDoAro: number;

  constructor(
    id: number,
    modelo: string,
    fabricante: string,
    valor: number,
    tamanhoDoAro: number
  ) {
    super(id, modelo, fabricante, valor);

    this._tamanhoDoAro = tamanhoDoAro;
  }

  public get tamanhoDoAro(): number {
    return this._tamanhoDoAro;
  }

  public set tamanhoDoAro(tamanhoDoAro: number) {
    this._tamanhoDoAro = tamanhoDoAro;
  }
}

// Interface com generics para classe Carrinho
interface ICarrinho<T extends Produto> {
  adicionar(produto: T): void;
  remover(id: number): void;
  listarItens(): T[];
  calcularTotal(): number;
}

// Classe com uso de generics
class Carrinho<T extends Produto> implements ICarrinho<T> {
  private _itens: T[] = [];

  public adicionar(produto: T) {
    this._itens.push(produto);
  }

  public remover(id: number) {
    this._itens = this._itens.filter((item) => item.id !== id);
  }

  public listarItens(): T[] {
    return this._itens;
  }

  public calcularTotal(): number {
    return this._itens.reduce((total, item) => total + item.valor, 0);
  }
}

// Instância de um carrinho
const meuCarrinho = new Carrinho<Produto>()

// Produtos pré-feitos
let produtosDaLoja: Produto[] = [
  new TV(1, 'Vision', 'Samsung', 2049.00, '4K', 43),
  new TV(2, 'Evo', 'LG', 6999.00, '4K', 55),
  new Celular(3, 'Poco X5', 'Xiaomi', 2000.00, '128GB'),
  new Celular(4, 'S24 Ultra', 'Samsung', 5499.00, '512GB'),
  new Bicicleta(5, 'Caloi Explorer', 'Caloi', 2499.00, 29),
  new Bicicleta(6, 'Sense One', 'Caloi', 2799.00, 29),
]

const divProdutos = document.getElementById('produtos-disponiveis')!;
const divCarrinho = document.getElementById('carrinho-itens')!;
const spanTotal = document.getElementById('carrinho-total')!;

// Renderizador da página toda, atualiza os produtos e o carrinho
const atualizarDisplay = () => {
  divProdutos.innerHTML = '';
  divCarrinho.innerHTML = '';

  //Itera sobre os elementos do array e coloca na página
  produtosDaLoja.forEach((produto) => {
    const itemElement = document.createElement('div');
    let otherInfo = '';

    if (produto instanceof TV) {
      otherInfo = `Resolução: ${produto.resolucao}, ${produto.tamanhoEmPolegadas}"`;
    } else if (produto instanceof Celular) { 
      otherInfo = `Armazenamento: ${produto.memoria}`;
    } else if (produto instanceof Bicicleta) {
      otherInfo = `Aro: ${produto.tamanhoDoAro}`;
    };

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
    const botaoAdicionar = itemElement.querySelector('.btn-adicionar')!;
    botaoAdicionar.addEventListener('click', () => {
      meuCarrinho.adicionar(produto);
      atualizarDisplay();
    })

    divProdutos.appendChild(itemElement);
  });

  // Itera sobre os elementos da variável do tipo Carrinho e coloca os elementos no carrinho
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
    const botaoRemover = itemCarrinho.querySelector('.btn-remover')!;
    botaoRemover.addEventListener('click', () => {
      meuCarrinho.remover(element.id);
      atualizarDisplay();
    });

    divCarrinho.appendChild(itemCarrinho);
  });

  spanTotal.textContent = `R$ ${meuCarrinho.calcularTotal().toFixed(2)}`;
};

atualizarDisplay();