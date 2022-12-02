import { beTarask } from "date-fns/locale";
import { remove, values } from "lodash";
import { addWorkToList} from "./list.js"


const formContainer = document.querySelector('.form')
const closeBtn = document.querySelector('.close');
const addBtn = document.querySelector('.add-work');
const form = document.querySelector('form');
const listContainer = document.querySelector('.list');


// add button functionality
export function addwork(){
    addBtn.addEventListener('click', showForm);

    closeBtn.addEventListener('click',closeForm);

    form.addEventListener('submit', (e)=> callBackFunction(e));
}

//form display and close
function showForm(){
    formContainer.classList.add('active');
}
function closeForm(){
    formContainer.classList.remove('active');
}
// end form display

// const LOCAL_STORAGE_LIST_KEY = 'task.lists'
// const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListsId'
// const lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) ||[];
// const selectedId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY)

// listContainer.addEventListener('click', e=>{
//     if(e.target.tagName.toLowerCase() === 'li'){
//         selectedId = e.target.dataset.listId
//         saveNrender();
//     }
// })
let lists;

let listStore = localStorage.getItem('task');
if(listStore == null){
   lists = []
}else{
    lists = JSON.parse(listStore);
}


function callBackFunction(e){
    e.preventDefault();
    
    const workToDo= document.getElementById('workToDo').value;
    const workPriority= document.getElementById('priority').value;
    let error =  document.querySelector('span');

    
    if(!workToDo){
        error.classList.add('error');
    }else{
        error.classList.remove('error');
        const mywork = createList(workToDo, workPriority);

        lists.push(mywork)
        saveNrender();

        form.reset();
        
        formContainer.classList.remove('active');
    }
}

function createList(workToDo , workPriority){
    return{id:Date.now().toString(), name: workToDo, priority : workPriority  }
}

function saveNrender(){
    save();
    render();
}

function save(){
    localStorage.setItem("task" ,JSON.stringify(lists))
}

function render(){
    clearElement(listContainer);
    
    lists.forEach(list=>{
        const listElement=document.createElement('li')
        listElement.dataset.listId = list.id
        listElement.classList.add('list-name')

        const workName = document.createElement('div')
        const priorityLevel = document.createElement('div')
        const check = document.createElement('div')
        const checkBox = document.createElement('input')
        const deleteBtn = document.createElement('button')

        workName.classList.add('work-name')
        priorityLevel.classList.add('work-priority')
        deleteBtn.classList.add('delete')
        check.classList.add('check')
        checkBox.setAttribute('type', 'checkbox')

        workName.innerHTML = list.name
        priorityLevel.innerHTML = list.priority
        deleteBtn.innerHTML = "x"

        check.append(checkBox)
        listElement.append(workName,priorityLevel, check , deleteBtn);

        listContainer.append(listElement)

        deleteBtn.addEventListener('click' ,(e)=> {
                listElement.remove();
                lists.splice(listElement,1)
                // console.log(typeof(lists))
                save();
        })


    })
        
}

function clearElement(element){
    while(element.firstChild){
        element.removeChild(element.firstChild)
    }
}



render();