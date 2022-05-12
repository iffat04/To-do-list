var text_container = document.getElementById('todo-text');
var task_container = document.getElementById('todo_list');
//text_container.addEventListener('')
var isDisplayPending =false;

//getting task array from local storage
let tasks =JSON.parse((localStorage.getItem('tasks-list')));


//delete task
function deleteTask(e){
console.log(e.parentNode.id);
const del_id = e.parentNode.id;
tasks.splice(del_id,1);
localStorage.setItem('tasks-list',JSON.stringify(tasks));
displayTask();
}


//update status
function updateStatus(e){
    console.log(e);
    const update_id = e.parentNode.id;
    e.parentNode.parentNode.style.textDecoration = "line-through";

    e.classList.add('complete');
    tasks[update_id].status="completed";
    localStorage.setItem('tasks-list',JSON.stringify(tasks));
    displayTask();
}


////display tasks in UI
function displayTask(){
    if(tasks){
        console.log(tasks)
        let li= "";
    var display_task=[];
    if(isDisplayPending){
        display_task = tasks.filter(task=>task.status==='pending')
    }
    else{
    display_task = tasks;
    }
    display_task.forEach((task,id)=>{
        console.log(id,task);
        //const div = document.createElement("div");
        //div.classList.add("singleTask"); 
        li+= `
        <li class="list-group-item list-group-item-success d-flex justify-content-between">
                                ${task.title}

                                <span class='d-flex justify-content-center align-items-center' id="${id}">

                                <i class="fab fa-angellist px-3 fs-3 icon" title="Done" onclick="updateStatus(this)"></i>

                                <i class="fas fa-trash fs-4 del-icon icon" title="Delete" onclick="deleteTask(this)"  ></i>
                                </span>

                                </li>
        `
        //task_container.appendChild(div)
    });
    task_container.innerHTML= li;

    }

}
displayTask();


///set data within the local storage object

const addtask =(data)=>{
    //let tasks = localStorage.getItem('tasks-list');
    
    if(tasks){
        //tasks = JSON.parse(tasks);
        //show in ui
    }

    else {
        tasks = [];
    }
    let taskobj = {title:data, status:"pending"}
    tasks.push(taskobj);
    const tasksStringified = JSON.stringify(tasks);
    localStorage.setItem('tasks-list',tasksStringified);

    //display in ui with newly added tasks

    displayTask();

}

document.getElementById('input-form').addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log('clicked');

    //getting to do text from input form
    const text = text_container.value;
    console.log(text)
    text_container.value ="";
   

    //save data in local storage///////////////////////////////////
      addtask(text);

    
    /*
    var task = document.createElement('p');
    task.innerText = text;
    task.classList.add('singleTask')
    task_container.appendChild(task);
    task.addEventListener('click',()=>{
        task.style.textDecoration = "line-through"
    })
    */
   

})
const items = document.getElementsByClassName('catagory_button');
const bg_pending = document.getElementById('pending');
const bg_all =  document.getElementById('all');
for(const item of items){
    item.addEventListener('click',(e)=>{
        console.log('button clicked',e.target.id);
        
        if(e.target.id==="all"){
        isDisplayPending = false;
        bg_all.style.backgroundColor= "aquamarine";
        bg_pending.style.backgroundColor="rgb(239, 239, 239)"
        }
        else{
            isDisplayPending=true;
            bg_pending.style.backgroundColor= "aquamarine";
            bg_all.style.backgroundColor="rgb(239, 239, 239)"
        }
        displayTask();

    })
}