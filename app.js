var text_container = document.getElementById('todo-text');
var task_container = document.getElementById('todo_list');
var isDisplayPending =false;


//getting task array from local storage
let tasks =JSON.parse((localStorage.getItem('tasks-list')));

//update localstorage and UI
function updateLocalStorage(object){
localStorage.setItem('tasks-list',JSON.stringify(object));
displayTask();
}

//delete task
function deleteTask(e){
//console.log(e.parentNode.id);
const del_id = e.parentNode.id;
tasks.splice(del_id,1);
updateLocalStorage(tasks);
}


//update status
function updateStatus(e){
    //console.log(e);
    const update_id = e.parentNode.id;
    tasks[update_id].status="completed";
    tasks[update_id].style="complete";
    updateLocalStorage(tasks);
}


////display tasks in UI
function displayTask(){
    if(tasks){
        console.log(tasks)
        let li= "";

        //select displaytask upon catagory
        var display_task=[];
        if(isDisplayPending){
            display_task = tasks.filter(task=>task.status==='pending')
        }
        else{
        display_task = tasks;
        }


        display_task.forEach((task,id)=>{
            console.log(id,task);
            li+= `
            <li class="list-group-item list-group-item-success d-flex justify-content-between">
                                    ${task.title}

                                    <span class='d-flex justify-content-center align-items-center' id="${id}">

                                    <i class="fab fa-angellist px-3 mx-3 fs-3 icon ${task.style}" title="Done" onclick="updateStatus(this)"></i>

                                    <i class="fas fa-trash fs-4 del-icon icon" title="Delete" onclick="deleteTask(this)"  ></i>
                                    </span>
            </li>
            `
            });
            task_container.innerHTML= li;
        }
}


displayTask();


///set data within the local storage object
const addtask =(inputData)=>{    
    if(!tasks){
        tasks = [];
    }

    let taskobj = {title:inputData, status:"pending", style:"default"};
    tasks.push(taskobj);
    updateLocalStorage(tasks);
}

///get input data from form
document.getElementById('input-form').addEventListener('submit',(e)=>{
    e.preventDefault();
    addtask(text_container.value);
    text_container.value ="";     
})

//////////////////////////all and pending task filter ///////////////////
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