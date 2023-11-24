
function inputhandler(){
  const inputs = document.querySelectorAll("input");
  for(let i=0; i<inputs.length; i++){
  const id= inputs[i].id;
  const key = "input-"+id;
  const value = localStorage.getItem(key);
  if(value){
    inputs[i].value = value;
  }
  }

  for(let i=0; i<inputs.length; i++){
    inputs[i].addEventListener("change", (e)=>{
    const id = e.target.id;
    const value = e.target.value;
    const key = "input-"+id;
    localStorage.setItem(key,value);
    })

  }
}
window.addEventListener("load",()=>{
  inputhandler();
})