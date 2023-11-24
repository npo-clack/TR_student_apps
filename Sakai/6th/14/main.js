const width = 320;
const height = 480;

let container = null;

let heroElement = null;
const heroSize = width / 20;
let heroX = width / 2;
let heroY = height / 2;

const update = () => {
 heroElement.style.left = `${heroX - heroSize} / 2px`;
 heroElement.style.top = `${heroY - heroSize} / 2px`;
}



const init = () => {
  container = document.createElement("div");
  container.style.position ="absolute";
  container.style.width = `${width}px`;
  container.style.height = `${height}px`;
  container.style.backgroundColor = "#0000ff";
  document.body.appendChild(container);
  heroElement=document.createElement("div");
  heroElement.style.position ="absolute";
  heroElement.style.width = `${heroSize}px`;
  heroElement.style.height = `${heroSize}px`;
  heroElement.textContent = '☻';
  container.appendChild(heroElement);
  heroElement.style.fontSize = '60px';
  
};


window.onload = ()  => {
 init();
}
