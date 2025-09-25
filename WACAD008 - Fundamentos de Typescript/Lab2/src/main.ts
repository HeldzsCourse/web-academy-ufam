// Classe Aluno com id, nome completo, idade, altura e peso
class Aluno {
  // Atributos públicos para acesso direto facilitado
  constructor(
    public id: number,
    public nomeCompleto: string,
    public idade: number,
    public altura: number,
    public peso: number
  ) {
    this.id = id;
    this.nomeCompleto = nomeCompleto;
    this.idade = idade;
    this.altura = altura;
    this.peso = peso;
  }
}

// Classe Turma com id, nome, lista de alunos, getNumAlunos(), getMediaIdades(), getMediaAlturas(), getMediaPesos()
class Turma {
  listaDeAlunos: Aluno[] = [];

  constructor(public id: number, public nome: string) {
    this.id = id;
    this.nome = nome;
  }

  getNumAlunos(): number {
    return this.listaDeAlunos.length;
  }

  getMediaIdades(): number {
    if (this.listaDeAlunos.length === 0) return 0; // Impede que retorne NaN
    const somaDasIdades = this.listaDeAlunos.reduce(
      (total, aluno) => total + aluno.idade,
      0
    );
    return somaDasIdades / this.listaDeAlunos.length;
  }

  getMediaAlturas(): number {
    if (this.listaDeAlunos.length === 0) return 0;
    const somaDasAlturas = this.listaDeAlunos.reduce(
      (total, aluno) => total + aluno.altura,
      0
    );
    return somaDasAlturas / this.listaDeAlunos.length;
  }

  getMediaPesos(): number {
    if (this.listaDeAlunos.length === 0) return 0;
    const somaDosPesos = this.listaDeAlunos.reduce(
      (total, aluno) => total + aluno.peso,
      0
    );
    return somaDosPesos / this.listaDeAlunos.length;
  }
}

const educacaoFisica = new Turma(1, "Turma de Educação Física");
let alunoID = 1;

const form = document.getElementById("aluno-form") as HTMLFormElement;
const formTitle = document.getElementById("form-title") as HTMLHeadingElement;
const inputId = document.getElementById("aluno-id") as HTMLInputElement;
const inputNome = document.getElementById("nome") as HTMLInputElement;
const inputIdade = document.getElementById("idade") as HTMLInputElement;
const inputAltura = document.getElementById("altura") as HTMLInputElement;
const inputPeso = document.getElementById("peso") as HTMLInputElement;
const submitButton = document.getElementById(
  "submit-button"
) as HTMLButtonElement;
const clearButton = document.getElementById(
  "clear-button"
) as HTMLButtonElement;

const numAlunos = document.getElementById("stat-num-alunos")!;
const mediaIdades = document.getElementById("stat-media-idades")!;
const mediaAlturas = document.getElementById("stat-media-alturas")!;
const mediaPesos = document.getElementById("stat-media-pesos")!;

const alunosTable = document.getElementById("alunos-table-body")!;

// Renderizador das estatísticas
const statsRender = () => {
  numAlunos.textContent = educacaoFisica.getNumAlunos().toString();
  mediaIdades.textContent = educacaoFisica.getMediaIdades().toString();
  mediaAlturas.textContent = educacaoFisica.getMediaAlturas().toFixed(2);
  mediaPesos.textContent = educacaoFisica.getMediaPesos().toFixed(1);
};

// Renderizador da lista de alunos (array listaDeAlunos do objeto)
const listRender = () => {
  alunosTable.innerHTML = "";

  educacaoFisica.listaDeAlunos.forEach((aluno) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${aluno.nomeCompleto}</td>
      <td class="text-center">${aluno.idade}</td>
      <td class="text-center">${aluno.altura.toFixed(2)} m</td>
      <td class="text-center">${aluno.peso.toFixed(1)} kg</td>
      <td class="text-center">
        <button class="btn-edit" data-id="${aluno.id}">✏️</button>
        <button class="btn-delete" data-id="${aluno.id}">🗑️</button>
      </td>
    `;
    alunosTable.appendChild(tr);
  });
};

// Chama as duas funções
const updatePage = () => {
  statsRender();
  listRender();
};

// Limpar o formulário
const resetForm = () => {
  form.reset();
  inputId.value = "";
  formTitle.textContent = "Adicionar Novo Aluno";
  submitButton.textContent = "Adicionar Aluno";
};

// Edita ou salva novo aluno na lista
const saveAluno = (
  nome: string,
  idade: number,
  altura: number,
  peso: number
) => {
  const id = parseInt(inputId.value);
  const alturaMetros = altura / 100;

  if (id) {
    const aluno = educacaoFisica.listaDeAlunos.find((a) => a.id === id);
    if (aluno) {
      aluno.nomeCompleto = nome;
      aluno.idade = idade;
      aluno.altura = alturaMetros;
      aluno.peso = peso;
    }
  } else {
    const novoAluno = new Aluno(alunoID++, nome, idade, alturaMetros, peso);
    educacaoFisica.listaDeAlunos.push(novoAluno);
  }

  resetForm();
  updatePage();
};

// Remove aluno por id da lista
const deleteAluno = (id: number) => {
  educacaoFisica.listaDeAlunos = educacaoFisica.listaDeAlunos.filter(
    (a) => a.id !== id
  );
  if (parseInt(inputId.value) === id) {
    resetForm();
  }
  updatePage();
};

// Edita os dados do aluno escolhido pelo id da lista
const editForm = (id: number) => {
  const aluno = educacaoFisica.listaDeAlunos.find((a) => a.id === id);
  if (aluno) {
    inputId.value = aluno.id.toString();
    inputNome.value = aluno.nomeCompleto;
    inputIdade.value = aluno.idade.toString();
    inputAltura.value = (aluno.altura * 100).toString();
    inputPeso.value = aluno.peso.toString();

    formTitle.textContent = "Editar Aluno";
    submitButton.textContent = "Salvar alterações";
  }
};

// Ouvidor do formulário
form.addEventListener("submit", (event) => {
  event.preventDefault();

  saveAluno(
    inputNome.value,
    parseInt(inputIdade.value),
    parseInt(inputAltura.value),
    parseInt(inputPeso.value)
  );
});

// Ouvidor do botão de limpar form
clearButton.addEventListener("click", () => {
  resetForm();
});

// Ouvidor dos botões de ação dos alunos da lista
alunosTable.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  const id = parseInt(target.getAttribute("data-id") || "0");

  if (target.classList.contains("btn-delete")) {
    if (confirm("Tem certeza de que deseja apagar esse aluno?")) {
      deleteAluno(id);
    }
  }

  if (target.classList.contains("btn-edit")) {
    editForm(id);
  }
});

updatePage();
