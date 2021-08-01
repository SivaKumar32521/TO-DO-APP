//To Do List
document.getElementById("todo-btn").addEventListener("click", function(event){

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
document.getElementById("todo-list").addEventListener("click", function(e){
    const todoListBtn = e.target;

    //onclick todo ongoing button
    if(todoListBtn.classList[0] === 'ongoingButton-btn'){

        const ongoingList = document.getElementById("ongoing-list");

        const ongoingDiv = document.createElement("div");

        const ongoingNewListItem = document.createElement("li");

        ongoingNewListItem.innerHTML = todoListBtn.parentElement.innerText;

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
document.getElementById("todo-list").addEventListener("dblclick", function(e){
    const item = e.target;

    if(item.classList[0] === 'todo-div'){
        item.remove();
    }
});

//on click completed button in the ongoing list
document.getElementById("ongoing-list").addEventListener("click", function(e){
    const ongoingListBtn = e.target;

    //onclick ongoing completed button
    if(ongoingListBtn.classList[0] === 'ongoingCompletedButton-btn'){
        
        const completedList = document.getElementById("completed-list");

        const completedDiv = document.createElement("div");

        const completedNewListItem = document.createElement("li");

        completedNewListItem.innerHTML = ongoingListBtn.parentElement.innerText;

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
document.getElementById("completed-list").addEventListener("click", function(e){
    const completedListBtn = e.target;

    //onclick completed trash button
    if(completedListBtn.classList[0] === 'completedListTrashButton-btn'){
        completedListBtn.parentElement.remove();
    }
    
});



