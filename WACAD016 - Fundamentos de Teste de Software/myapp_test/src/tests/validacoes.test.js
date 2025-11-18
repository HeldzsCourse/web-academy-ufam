const {
  primeiroNome,
  verificarDisponibilidadeEstoque,
  calcularPrecoTotal,
} = require("../utils/validacoes");

describe("primeiroNome()", () => {
  it("deve retornar o primeiro nome quando o nome completo é fornecido", () => {
    const fullName = "John Doe Etc";
    const result = primeiroNome(fullName);
    expect(result).toBe("John");
  });

  it("deve retornar o mesmo nome quando não há espaço em branco", () => {
    const name = "Alice";
    const result = primeiroNome(name);
    expect(result).toBe(name);
  });

  it("deve retornar o primeiro nome corretamente quando há espaço em branco no início", () => {
    const name = " Alice Test";
    const result = primeiroNome(name);
    expect(result).toBe("Alice");
  });

  it("deve retornar o primeiro nome corretamente quando há espaço em branco no final", () => {
    const name = "Alice Test ";
    const result = primeiroNome(name);
    expect(result).toBe("Alice");
  });
});

describe("verificarDisponibilidadeEstoque()", () => {
  it("deve retornar true quando a quantidade desejada estiver disponível no estoque", () => {
    const tipoProduto = "laptop";
    const quantidade = 5;
    const result = verificarDisponibilidadeEstoque(tipoProduto, quantidade);
    expect(result).toBe(true);
  });

  it("deve retornar false quando a quantidade desejada não estiver disponível no estoque", () => {
    const tipoProduto = "livro";
    const quantidade = 1;
    const result = verificarDisponibilidadeEstoque(tipoProduto, quantidade);
    expect(result).toBe(false);
  });

  it("deve retornar true quando a quantidade desejada for igual ao estoque disponível", () => {
    const tipoProduto = "headphone";
    const quantidade = 5;
    const result = verificarDisponibilidadeEstoque(tipoProduto, quantidade);
    expect(result).toBe(true);
  });

  it("deve retornar true quando a quantidade desejada for menor que o estoque disponível", () => {
    const tipoProduto = "tablet";
    const quantidade = 10;
    const result = verificarDisponibilidadeEstoque(tipoProduto, quantidade);
    expect(result).toBe(true);
  });

  it("deve retornar false quando a quantidade desejada for maior que o estoque disponível", () => {
    const tipoProduto = "smartphone";
    const quantidade = 25;
    const result = verificarDisponibilidadeEstoque(tipoProduto, quantidade);
    expect(result).toBe(false);
  });

  it("deve retornar false quando o tipo de produto não existir no estoque", () => {
    const tipoProduto = "console";
    const quantidade = 1;
    const result = verificarDisponibilidadeEstoque(tipoProduto, quantidade);
    expect(result).toBe(false);
  });
});

describe("calcularPrecoTotal()", () => {
  it("deve retornar o preço total correto para um array de produtos", () => {
    const produtos = [
      { nome: "Produto 1", price: 10, quantidade: 2 },
      { nome: "Produto 2", price: 15, quantidade: 2 },
      { nome: "Produto 3", price: 20, quantidade: 1 },
    ];
    const result = calcularPrecoTotal(produtos);
    expect(result).toBe(70);
  });

  it("deve retornar 0 quando o array de produtos estiver vazio", () => {
    const produtos = [];
    const result = calcularPrecoTotal(produtos);
    expect(result).toBe(0);
  });

  it("deve retornar o preço total correto quando houver apenas um produto no array", () => {
    const produtos = [{ nome: "Produto 1", price: 50, quantidade: 3 }];
    const result = calcularPrecoTotal(produtos);
    expect(result).toBe(150);
  });

  it("deve retornar o preço total correto quando os produtos tiverem quantidade 0", () => {
    const produtos = [
      { nome: "Produto 1", price: 10, quantidade: 0 },
      { nome: "Produto 2", price: 20, quantidade: 0 },
    ];
    const result = calcularPrecoTotal(produtos);
    expect(result).toBe(0);
  });
});
