const customName = document.getElementById("customname");
const randomize = document.querySelector(".randomize");
const story = document.querySelector(".story");

function randomValueFromArray(array) {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
}

const storyText = `O calor de 94°F parecia pesar no ar, trazendo velhas memórias. Foi por isso que :insertx: voltou até :inserty:, um lugar que não visitava há anos. Parado ali, encarando as marcas do tempo, :insertx: apenas :insertz:. Do outro lado da rua, Bob o reconheceu. Ele sabia o que aquele lugar significava e o que :insertx: carregava nos ombros — um peso invisível, quase uns 300 libras de pura saudade.`;
const insertX = ["um Zé Ninguém com o violão nas costas",
  "a Dama do Chapéu Roxo",
  "um Poeta Esquecido pela cidade"];
const insertY = ["o fliperama abandonado da cidade",
  "a velha ponte de madeira sobre o riacho",
  "o último banco livre da praça central"];
const insertZ = ["deu um sorriso triste e sussurrou um nome ao vento",
  "sentou no chão e ficou em silêncio por um longo tempo",
  "tirou uma foto gasta do bolso e a deixou ali"];

randomize.addEventListener("click", result);

function result() {
  let newStory = storyText;

  let xItem = randomValueFromArray(insertX);
  let yItem = randomValueFromArray(insertY);
  let zItem = randomValueFromArray(insertZ);
  newStory = newStory.replaceAll(":insertx:", xItem);
  newStory = newStory.replace(":inserty:", yItem);
  newStory = newStory.replace(":insertz:", zItem);

  if (customName.value !== "") {
    const name = customName.value;
    newStory = newStory.replace("Bob", name);
  }

  if (document.getElementById("uk").checked) {
    const weight = Math.round(300 * 0.45359237) + " kg";
    const temperature = Math.round((94 - 32) * (5 / 9)) + "°C";
    newStory = newStory.replace("94°F", temperature);
    newStory = newStory.replace("300 libras", weight);
  }

  story.textContent = newStory;
  story.style.visibility = "visible";
}
