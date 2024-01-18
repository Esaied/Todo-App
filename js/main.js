var taskInput = document.getElementById('taskInput')
var btnTask = document.getElementById('btnTask')
var tasks =document.getElementById('tasks')
var message =document.getElementById('message')
var loading =document.getElementById('loading')


btnTask.addEventListener('click',function(){
    var task ={
        title: taskInput.value,
        apiKey: "65a9511d2681618c591c4e24"
    }
    addTodo(task)
})



async function addTodo(task){
    var data =await fetch('https://todos.routemisr.com/api/v1/todos',{
        method: 'post',
        body: JSON.stringify(task),
        headers: { 'content-type': 'application/json'}
    })
    var result = await data.json()
    if(result.message == 'success'){
        message.innerHTML = 'success!'
        message.classList.add('text-success')
        message.classList.remove('text-danger')
        AllTodo()
    }else if(result.message == 'error'){
        message.innerHTML = 'Type the task again !'
        message.classList.add('text-danger')
        message.classList.remove('text-success')
    }
    console.log(result);
}

async function deleteTodo(todoid){
    var data =await fetch('https://todos.routemisr.com/api/v1/todos',{
        method: 'delete',
        body: JSON.stringify({todoId: todoid}),
        headers: { 'content-type': 'application/json'}
    })
    var result = await data.json()
    if(result.message == 'success'){
        AllTodo()
    }
    console.log(result);
}


async function markTodo(todoid){
    var data =await fetch('https://todos.routemisr.com/api/v1/todos',{
        method: 'put',
        body: JSON.stringify({todoId: todoid}),
        headers: { 'content-type': 'application/json'}
    })
    var result = await data.json()
    if(result.message == 'success'){
        AllTodo()
    }
    console.log(result);
}


async function AllTodo(){
    var data =await fetch('https://todos.routemisr.com/api/v1/todos/65a9511d2681618c591c4e24')
    var result = await data.json()
    console.log(result);
    if(result.message== 'success'){
        loading.classList.add('d-none')
        display(result.todos)
    }
    clear()
}
AllTodo()

function display(data){
    var box =``
    for(let i=0; i<data.length; i++){
        box +=`
        <div class="task w-75 m-auto d-flex justify-content-between px-2 pt-2 my-2 rounded-4">
                    <p class="task-text ${data[i].completed? 'text-decoration-line-through': ''}">${data[i].title}</p>
                    <div>
                        <i onclick="markTodo('${data[i]._id}')" class="fa-regular fa-circle-check px-2 ${data[i].completed? 'd-none': ''}"></i>
                        <i onclick="deleteTodo('${data[i]._id}')" class="fa-solid fa-trash px-2"></i>
                    </div>
                </div>
        `
    }
    tasks.innerHTML= box
}
function clear(){
    taskInput.value = ''
}
new WOW().init();

