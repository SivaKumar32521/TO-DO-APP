//To Do List
document.getElementById("todo-btn").addEventListener("click", (event) => {

    //prevent form from submitting
    event.preventDefault();
    
    let input = document.getElementById("todo-input");

    let list_items = document.getElementById("todo-list");

    if(input.value == ''){
        alert("Enter the to do list");
    }
    else{
        let todo_div = document.createElement("div");

        todo_div.classList.add("todo-div");

        //new list item
        let newListItem = document.createElement("li");

        newListItem.innerHTML = input.value;

        saveToDoList(input.value);

        todo_div.appendChild(newListItem);

        //Ongoing button
        let ongoingButton = document.createElement("button");

        ongoingButton.innerHTML = '<i class="fas fa-rocket"></i>';

        ongoingButton.classList.add("ongoingButton-btn");

        todo_div.appendChild(ongoingButton);

        list_items.appendChild(todo_div);
    
        input.value = '';
    }
});

//on click todo ongoing button
document.getElementById("todo-list").addEventListener("click", (event) => {
    const todoListBtn = event.target;

    //onclick todo ongoing button
    if(todoListBtn.classList[0] === 'ongoingButton-btn'){

        const ongoingList = document.getElementById("ongoing-list");

        const ongoingDiv = document.createElement("div");

        const ongoingNewListItem = document.createElement("li");

        ongoingNewListItem.innerHTML = todoListBtn.parentElement.innerText;
        
        saveOngoingList(todoListBtn.parentElement.innerText);
 
        deleteToDo(todoListBtn.parentElement.innerText);

        ongoingDiv.appendChild(ongoingNewListItem);
    
        //Completed button
        let ongoingCompletedButton = document.createElement("button");

        ongoingCompletedButton.innerHTML = '<i class="fas fa-check"></i>';

        ongoingCompletedButton.classList.add("ongoingCompletedButton-btn");

        ongoingDiv.appendChild(ongoingCompletedButton);

        ongoingList.appendChild(ongoingDiv);

        todoListBtn.parentElement.remove();
    }
});

//To Delete an item in the todo list
//On double click delete it
document.getElementById("todo-list").addEventListener("dblclick", (event) => {
    
    const item = event.target;

    if(item.classList[0] === 'todo-div'){
        
        deleteToDo(item.innerText);
        
        item.remove();
    }
});

//on click completed button in the ongoing list
document.getElementById("ongoing-list").addEventListener("click", (event) => {
    
    const ongoingListBtn = event.target;

    //onclick ongoing completed button
    if(ongoingListBtn.classList[0] === 'ongoingCompletedButton-btn'){
        
        const completedList = document.getElementById("completed-list");

        const completedDiv = document.createElement("div");

        const completedNewListItem = document.createElement("li");

        completedNewListItem.innerHTML = ongoingListBtn.parentElement.innerText;

        saveCompletedList(ongoingListBtn.parentElement.innerText);
        
        removeTaskFromOngoingList(ongoingListBtn.parentElement.innerText);

        completedDiv.appendChild(completedNewListItem);
    
        //trash button
        let trashButton = document.createElement("button");

        trashButton.innerHTML = '<i class="fas fa-trash"></i>';

        trashButton.classList.add("completedListTrashButton-btn");

        completedDiv.appendChild(trashButton);

        completedList.appendChild(completedDiv);

        ongoingListBtn.parentElement.remove();
    }
});

//Completed List
document.getElementById("completed-list").addEventListener("click", (event) => {
    
    const completedListBtn = event.target;

    //onclick completed trash button
    if(completedListBtn.classList[0] === 'completedListTrashButton-btn'){
        
        removeCompletedTask(completedListBtn.parentElement.innerText);
        
        completedListBtn.parentElement.remove();
    }
});

/*-------------------------Local Storage Implementation----------------------*/

//Save ToDo list
let saveToDoList = (todo) => {
    let saveToDoTasks;
    if(localStorage.getItem("saveToDoTasks") == null){
        saveToDoTasks = [];
    }
    else{
        saveToDoTasks = JSON.parse(localStorage.getItem("saveToDoTasks"));
    }

    saveToDoTasks.push(todo);

    localStorage.setItem("saveToDoTasks", JSON.stringify(saveToDoTasks));
}

document.addEventListener("DOMContentLoaded", () => {

    let list_items = document.getElementById("todo-list");

    let saveToDoTasks;
    if(localStorage.getItem("saveToDoTasks") == null){
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

        ongoingButton.classList.add("ongoingButton-btn");

        todo_div.appendChild(ongoingButton);

        list_items.appendChild(todo_div);
    });

    localStorage.setItem("saveToDoTasks", JSON.stringify(saveToDoTasks));
});

//delete stored todo from local storage
let deleteToDo = (todo) => {
    
    let saveToDoTasks;
    
    if(localStorage.getItem("saveToDoTasks") == null){
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
    
    if(localStorage.getItem("saveOngoingTasks") == null){
        saveOngoingTasks = [];
    }
    else{
        saveOngoingTasks = JSON.parse(localStorage.getItem("saveOngoingTasks"));
    }

    saveOngoingTasks.push(ongoingTask);

    localStorage.setItem("saveOngoingTasks", JSON.stringify(saveOngoingTasks)); 
}

document.addEventListener("DOMContentLoaded", () => {
    
    const ongoingList = document.getElementById("ongoing-list");

    let saveOngoingTasks;

    if(localStorage.getItem("saveOngoingTasks") == null){
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

        ongoingCompletedButton.classList.add("ongoingCompletedButton-btn");

        ongoingDiv.appendChild(ongoingCompletedButton);

        ongoingList.appendChild(ongoingDiv);

    });

    localStorage.setItem("saveOngoingTasks", JSON.stringify(saveOngoingTasks));
});

let removeTaskFromOngoingList = (OngoingTask) => {
    let saveOngoingTasks;
    
    if(localStorage.getItem("saveOngoingTasks") == null){
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
    
    if(localStorage.getItem("saveCompletedTasks") == null){
        saveCompletedTasks = [];
    }
    else{
        saveCompletedTasks = JSON.parse(localStorage.getItem("saveCompletedTasks"));
    }

    saveCompletedTasks.push(completedTask);

    localStorage.setItem("saveCompletedTasks", JSON.stringify(saveCompletedTasks));
}

document.addEventListener("DOMContentLoaded", () => {
    
    const completedList = document.getElementById("completed-list");

    let saveCompletedTasks;
    
    if(localStorage.getItem("saveCompletedTasks") == null){
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

        trashButton.classList.add("completedListTrashButton-btn");

        completedDiv.appendChild(trashButton);

        completedList.appendChild(completedDiv);
    });

    localStorage.setItem("saveCompletedTasks", JSON.stringify(saveCompletedTasks));
});

let removeCompletedTask = (deleteTask) => {
    
    let saveCompletedTasks;
    
    if(localStorage.getItem("saveCompletedTasks") == null){
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
    
    if(localStorage.getItem("saveToDoTasks") == null){
        saveToDoTasks = [];
    }
    else{
        saveToDoTasks = JSON.parse(localStorage.getItem("saveToDoTasks"));
    }

    saveToDoTasks = [];

    localStorage.setItem("saveToDoTasks", JSON.stringify(saveToDoTasks));

    let saveOngoingTasks;
    
    if(localStorage.getItem("saveOngoingTasks") == null){
        saveOngoingTasks = [];
    }
    else{
        saveOngoingTasks = JSON.parse(localStorage.getItem("saveOngoingTasks"));
    }

    saveOngoingTasks = [];

    localStorage.setItem("saveOngoingTasks", JSON.stringify(saveOngoingTasks)); 

    let saveCompletedTasks;
    
    if(localStorage.getItem("saveCompletedTasks") == null){
        saveCompletedTasks = [];
    }
    else{
        saveCompletedTasks = JSON.parse(localStorage.getItem("saveCompletedTasks"));
    }

    saveCompletedTasks = [];

    localStorage.setItem("saveCompletedTasks", JSON.stringify(saveCompletedTasks));

    location.reload();
});