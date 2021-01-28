

window.onload = function() {
  // console.log(localStorage.getItem("orderedList"));
  let orderedList = document.getElementById("lista-tarefas");
  
  if(localStorage.getItem("orderedList")!=null){
    loadList();
  }

let textField = document.getElementById("texto-tarefa");
let addItem = document.getElementById("criar-tarefa");
let removeAllButton = document.getElementById("apaga-tudo");
let removeCompletedButton = document.getElementById("remover-finalizados");
let buttons = document.getElementsByTagName("button");
let saveListButton = document.getElementById("salvar-tarefas");


addItem.addEventListener("click", criarTarefa);
removeAllButton.addEventListener("click", removeAll);
removeCompletedButton.addEventListener("click", removeCompleted);
saveListButton.addEventListener("click", saveList);


for(let i = 0; i < buttons.length; i+=1){
  buttons[i].style.cursor = "pointer";
}

function criarTarefa(){
  let newItem = document.createElement("li");
  newItem.classList.add("listItem");
  newItem.addEventListener("click", function(evt){ select(evt); });
  newItem.innerHTML = textField.value;
  orderedList.appendChild(newItem);
  let items = document.getElementsByClassName("listItem");
  for(let i = 0; i < items.length; i+=1){
    items[i].style.cursor = "pointer";
    items[i].addEventListener("dblclick", complete);
  }
  textField.value = "";
}

function select(evt){
  let items = document.getElementsByClassName("listItem");
  for(let i = 0; i < items.length; i+=1){
  items[i].classList.remove("selected");
  }
  evt.target.classList.add("selected");
}

function complete(evt){
  if(evt.target.classList.contains("completed")){
    evt.target.classList.remove("completed");
  } else {
  evt.target.classList.add("completed");
  }
}

function removeAll(){

  while (orderedList.firstChild) {
    orderedList.removeChild(orderedList.firstChild);
}
}

function removeCompleted(){
  let items = document.querySelectorAll('li');
  for (let i = 0; i < items.length; i += 1) {
    if (items[i].classList.contains('completed')) {
      orderedList.removeChild(items[i]);
    }
  }
}

function saveList(){
  let vetor = [];
  let list = document.getElementById("lista-tarefas");
  for(let i = 1; i < list.childNodes.length; i += 1){
    console.log(i);
    let item = list.childNodes[i].innerHTML;
    console.log(item);
    vetor.push(item);
    console.log(vetor);
  }

  let string = JSON.stringify(vetor);
  console.log(string)
  localStorage.setItem("orderedList", string);
}

function loadList(){
  let ordList = JSON.parse(localStorage.getItem("orderedList"));
  console.log(ordList);
  for(let i = 0; i < ordList.length; i += 1){
    let item = document.createElement("li");
    item.innerHTML = ordList[i];
    orderedList.appendChild(item);
  }
}

};
