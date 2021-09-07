const add_btn = document.getElementById("add-btn");
const todo_list = document.getElementById("todo-list");
const ongoing_list = document.getElementById("ongoing-list");
const completed_list = document.getElementById("completed-list");

//To Do List
add_btn.addEventListener("click", (event) => {

    //prevent form from submitting
    event.preventDefault();
    
    let input = document.getElementById("todo-input");

    if(input.value === ''){
        alert("Enter the to do");
    }
    else{
        let todo_div = document.createElement("div");
        
        todo_div.classList.add("todo-div");
        
        //new list item
        let newListItem = document.createElement("li");

        newListItem.innerHTML = input.value;

        saveToDoList(input.value);

        todo_div.appendChild(newListItem);

        //ongoing button
        let ongoingButton = document.createElement("button");
        
        ongoingButton.innerHTML = '<i class="fas fa-rocket"></i>';
    
        ongoingButton.classList.add("ongoing-btn");

        todo_div.appendChild(ongoingButton);

        todo_list.appendChild(todo_div);
    
        input.value = '';
    }
});

//on click ongoing button in the todo list
todo_list.addEventListener("click", (event) => {
    const todoListBtn = event.target;

    //onclick ongoing button
    if(todoListBtn.classList[0] === 'ongoing-btn'){

        const ongoingDiv = document.createElement("div");

        const ongoingNewListItem = document.createElement("li");

        ongoingNewListItem.innerHTML = todoListBtn.parentElement.innerText;
        
        saveOngoingList(todoListBtn.parentElement.innerText);
 
        deleteToDo(todoListBtn.parentElement.innerText);

        ongoingDiv.appendChild(ongoingNewListItem);
    
        //Completed button
        let ongoingCompletedButton = document.createElement("button");

        ongoingCompletedButton.innerHTML = '<i class="fas fa-check"></i>';

        ongoingCompletedButton.classList.add("completed-btn");

        ongoingDiv.appendChild(ongoingCompletedButton);

        ongoing_list.appendChild(ongoingDiv);

        todoListBtn.parentElement.remove();
    }
});

//double click to delete an item in the todo list
todo_list.addEventListener("dblclick", (event) => {
    
    const item = event.target;

    if(item.classList[0] === 'todo-div'){
        
        deleteToDo(item.innerText);
        
        item.remove();
    }
});

//Onclick completed button in the ongoing list
ongoing_list.addEventListener("click", (event) => {
    
    const ongoingListBtn = event.target;

    //onclick completed button
    if(ongoingListBtn.classList[0] === 'completed-btn'){

        const completedDiv = document.createElement("div");

        const completedNewListItem = document.createElement("li");

        completedNewListItem.innerHTML = ongoingListBtn.parentElement.innerText;

        saveCompletedList(ongoingListBtn.parentElement.innerText);
        
        removeTaskFromOngoingList(ongoingListBtn.parentElement.innerText);

        completedDiv.appendChild(completedNewListItem);
    
        //trash button
        let trashButton = document.createElement("button");

        trashButton.innerHTML = '<i class="fas fa-trash"></i>';

        trashButton.classList.add("trash-btn");

        completedDiv.appendChild(trashButton);

        completed_list.appendChild(completedDiv);

        ongoingListBtn.parentElement.remove();
    }
});

//Completed List
completed_list.addEventListener("click", (event) => {
    
    const completedListBtn = event.target;

    //onclick trash button
    if(completedListBtn.classList[0] === 'trash-btn'){
        
        removeCompletedTask(completedListBtn.parentElement.innerText);
        
        completedListBtn.parentElement.remove();
    }
});

/*-------------------------Local Storage Implementation----------------------*/

//Save ToDo list
let saveToDoList = (todo) => {
    let saveToDoTasks;
    if(localStorage.getItem("saveToDoTasks") === null){
        saveToDoTasks = [];
    }
    else{
        saveToDoTasks = JSON.parse(localStorage.getItem("saveToDoTasks"));
    }

    saveToDoTasks.push(todo);

    localStorage.setItem("saveToDoTasks", JSON.stringify(saveToDoTasks));
}

document.addEventListener("DOMContentLoaded", () => {
    let saveToDoTasks;
    if(localStorage.getItem("saveToDoTasks") === null){
        saveToDoTasks = [];
    }
    else{
        saveToDoTasks = JSON.parse(localStorage.getItem("saveToDoTasks"));
    }

    saveToDoTasks.forEach( todo => {
        let todo_div = document.createElement("div");

        todo_div.classList.add("todo-div");

        //new list item
        let newListItem = document.createElement("li");

        newListItem.innerHTML = todo;

        todo_div.appendChild(newListItem);

        //Ongoing button
        let ongoingButton = document.createElement("button");

        ongoingButton.innerHTML = '<i class="fas fa-rocket"></i>';

        ongoingButton.classList.add("ongoing-btn");

        todo_div.appendChild(ongoingButton);

        todo_list.appendChild(todo_div);
    });

    localStorage.setItem("saveToDoTasks", JSON.stringify(saveToDoTasks));
});

//delete stored todo from local storage
let deleteToDo = (todo) => {
    
    let saveToDoTasks;
    
    if(localStorage.getItem("saveToDoTasks") === null){
        saveToDoTasks = [];
    }
    else{
        
        saveToDoTasks = JSON.parse(localStorage.getItem("saveToDoTasks"));
        
        saveToDoTasks.splice(saveToDoTasks.indexOf(todo), 1);
    }
    
    localStorage.setItem("saveToDoTasks", JSON.stringify(saveToDoTasks));
}

//Save Ongoing List
let saveOngoingList = (ongoingTask) => {
    
    let saveOngoingTasks;
    
    if(localStorage.getItem("saveOngoingTasks") === null){
        saveOngoingTasks = [];
    }
    else{
        saveOngoingTasks = JSON.parse(localStorage.getItem("saveOngoingTasks"));
    }

    saveOngoingTasks.push(ongoingTask);

    localStorage.setItem("saveOngoingTasks", JSON.stringify(saveOngoingTasks)); 
}

document.addEventListener("DOMContentLoaded", () => {

    let saveOngoingTasks;

    if(localStorage.getItem("saveOngoingTasks") === null){
        saveOngoingTasks = [];
    }
    else{
        saveOngoingTasks = JSON.parse(localStorage.getItem("saveOngoingTasks"));
    }

    saveOngoingTasks.forEach(ongoingTask => {
        const ongoingDiv = document.createElement("div");

        const ongoingNewListItem = document.createElement("li");

        ongoingNewListItem.innerHTML = ongoingTask;

        ongoingDiv.appendChild(ongoingNewListItem);
    
        //Completed button
        let ongoingCompletedButton = document.createElement("button");

        ongoingCompletedButton.innerHTML = '<i class="fas fa-check"></i>';

        ongoingCompletedButton.classList.add("completed-btn");

        ongoingDiv.appendChild(ongoingCompletedButton);

        ongoing_list.appendChild(ongoingDiv);

    });

    localStorage.setItem("saveOngoingTasks", JSON.stringify(saveOngoingTasks));
});

let removeTaskFromOngoingList = (OngoingTask) => {
    let saveOngoingTasks;
    
    if(localStorage.getItem("saveOngoingTasks") === null){
        saveOngoingTasks = [];
    }
    else{
        
        saveOngoingTasks = JSON.parse(localStorage.getItem("saveOngoingTasks"));
        
        saveOngoingTasks.splice(saveOngoingTasks.indexOf(OngoingTask), 1);
    }

    localStorage.setItem("saveOngoingTasks", JSON.stringify(saveOngoingTasks));
}

//Save Completed List
let saveCompletedList = (completedTask) => {
    
    let saveCompletedTasks;
    
    if(localStorage.getItem("saveCompletedTasks") === null){
        saveCompletedTasks = [];
    }
    else{
        saveCompletedTasks = JSON.parse(localStorage.getItem("saveCompletedTasks"));
    }

    saveCompletedTasks.push(completedTask);

    localStorage.setItem("saveCompletedTasks", JSON.stringify(saveCompletedTasks));
}

document.addEventListener("DOMContentLoaded", () => {
    let saveCompletedTasks;
    
    if(localStorage.getItem("saveCompletedTasks") === null){
        saveCompletedTasks = [];
    }
    else{
        saveCompletedTasks = JSON.parse(localStorage.getItem("saveCompletedTasks"));
    }

    saveCompletedTasks.forEach(completedTask => {
        const completedDiv = document.createElement("div");
        
        const completedNewListItem = document.createElement("li");

        completedNewListItem.innerHTML = completedTask;

        completedDiv.appendChild(completedNewListItem);
    
        //trash button
        let trashButton = document.createElement("button");

        trashButton.innerHTML = '<i class="fas fa-trash"></i>';

        trashButton.classList.add("trash-btn");

        completedDiv.appendChild(trashButton);

        completed_list.appendChild(completedDiv);
    });

    localStorage.setItem("saveCompletedTasks", JSON.stringify(saveCompletedTasks));
});

let removeCompletedTask = (deleteTask) => {
    
    let saveCompletedTasks;
    
    if(localStorage.getItem("saveCompletedTasks") === null){
        saveCompletedTasks = [];
    }
    else{
        
        saveCompletedTasks = JSON.parse(localStorage.getItem("saveCompletedTasks"));
        
        saveCompletedTasks.splice(saveCompletedTasks.indexOf(deleteTask), 1);
    }

    localStorage.setItem("saveCompletedTasks", JSON.stringify(saveCompletedTasks));
}

//Reset
document.getElementById("reset-btn").addEventListener("click", () => {
    
    let saveToDoTasks;
    
    if(localStorage.getItem("saveToDoTasks") === null){
        saveToDoTasks = [];
    }
    else{
        saveToDoTasks = JSON.parse(localStorage.getItem("saveToDoTasks"));
    }

    saveToDoTasks = [];

    localStorage.setItem("saveToDoTasks", JSON.stringify(saveToDoTasks));

    let saveOngoingTasks;
    
    if(localStorage.getItem("saveOngoingTasks") === null){
        saveOngoingTasks = [];
    }
    else{
        saveOngoingTasks = JSON.parse(localStorage.getItem("saveOngoingTasks"));
    }

    saveOngoingTasks = [];

    localStorage.setItem("saveOngoingTasks", JSON.stringify(saveOngoingTasks)); 

    let saveCompletedTasks;
    
    if(localStorage.getItem("saveCompletedTasks") === null){
        saveCompletedTasks = [];
    }
    else{
        saveCompletedTasks = JSON.parse(localStorage.getItem("saveCompletedTasks"));
    }

    saveCompletedTasks = [];

    localStorage.setItem("saveCompletedTasks", JSON.stringify(saveCompletedTasks));

    location.reload();
});