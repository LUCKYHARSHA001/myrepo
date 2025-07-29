 const todolist=[];

function rendertodolist(){

let todolistHtml='';

for(let i=0;i<todolist.length;i++){
  const todoObject=todolist[i];
  // const name=todoObject.name;can also write as
  //  const dueDate=todoObject.dueDate;
  const {name,dueDate }=todoObject;
 
  const html =`
  <div>${name}</div>
  <div>${dueDate}</div>
  <button onclick="
  todolist.splice(${i},1);
  rendertodolist();
  " class="delete-todo-button">delete</button>
  `;
  todolistHtml+=html;
}

document.querySelector('.js-todo-list').innerHTML=todolistHtml;
}

function addtodo(){
 const inputElement= document.querySelector('.js-name-input');
 const name=inputElement.value;

const dateInputElement = document.querySelector('.js-due-date-input');
const dueDate = dateInputElement.value;

 todolist.push({
  name:name,
   dueDate:dueDate
  });
 inputElement.value=''; 
 rendertodolist();
}