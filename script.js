document.getElementById("botao").onclick = function () {    
 
  // cria um novo elemento div com conteúdo textual
  let divNova = document.createElement("div"); 
  let conteudoNovo = document.createTextNode("IComp/UFAM"); 
  
  //adiciona o nó de texto à nova div criada 
  divNova.appendChild(conteudoNovo); 

  // adiciona o novo elemento criado e seu conteúdo ao DOM 
  let bloco = document.getElementById("bloco"); 
  bloco.appendChild(divNova); 
}