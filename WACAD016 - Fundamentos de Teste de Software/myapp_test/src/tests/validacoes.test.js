const { primeiroNome } = require("../utils/validacoes");

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
