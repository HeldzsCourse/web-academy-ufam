const displayedImage = document.querySelector(".displayed-img");
const thumbBar = document.querySelector(".thumb-bar");

const btn = document.querySelector("button");
const overlay = document.querySelector(".overlay");

/* Declaring the array of image filenames */

/* Declaring the alternative text for each image file */

/* Looping through images */
for (let i=1; i<=5; i++){
  const newImage = document.createElement("img");
  newImage.setAttribute("src", `images/pic${i}.jpg`);
  newImage.setAttribute("alt", `Imagem ${i}`);
  thumbBar.appendChild(newImage);
  newImage.onclick = function(e){
    const imgSrc = e.target.getAttribute("src");
    displayedImage.setAttribute("src", imgSrc);
    const imgAlt = e.target.getAttribute("alt");
    displayedImage.setAttribute("alt", imgAlt);
  }
}

/* Wiring up the Darken/Lighten button */
btn.onclick = function(){
  const btnClass = btn.getAttribute("class");
  if (btnClass === "dark") {
    btn.setAttribute("class", "light");
    btn.textContent = "Lighten";
    overlay.style.backgroundColor = "rgba(0,0,0,0.5)";
  } else {
    btn.setAttribute("class", "dark");
    btn.textContent = "Darken";
    overlay.style.backgroundColor = "rgba(0,0,0,0)";
  }
}
