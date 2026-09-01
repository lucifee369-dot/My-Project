const myInput = document.getElementById("myInput");
const addBtn = document.getElementById( "addBtn");
const myLabel = document.getElementById( "myLabel");
const taskContainer = document.getElementById("taskContainer");
const totalTask = document.getElementById("totalTask");
const completedTask = document.getElementById("completedTask");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let totalTaskCount = tasks.length;

let completedTaskCount = tasks.filter(task => task.completed).length;

totalTask.textContent = `Total Task: ${totalTaskCount}`;
completedTask.textContent = `Completed Task: ${completedTaskCount}`;

function createTask (taskData) {

    const taskDiv = document.createElement("div");
    const task = document.createElement("p");
    const editBtn = document.createElement("button");
    const saveBtn = document.createElement("button");
    const doneBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");

    taskDiv.className = "taskDiv";
    task.className = "task";
    editBtn.className = "editBtn";
    saveBtn.className = "saveBtn";
    doneBtn.className = "doneBtn";
    deleteBtn.className = "deleteBtn";

    task.textContent = taskData.text;

    doneBtn.textContent = "Done";
    editBtn.textContent = "Edit";
    saveBtn.textContent = "Save";
    deleteBtn.textContent = "Delete";

    if (taskData.completed) {
        task.style.textDecoration = "line-through";
        doneBtn.textContent = "Undo";
    }

    editBtn.onclick = function () {

        if(editBtn.textContent === "Edit"){

            myInput.value = task.textContent;
            editBtn.textContent = "Save";

        }
        else{

            if (myInput.value.trim() === "") {
                return;
            }

            taskData.text = myInput.value;
            taskData.completed = false;

            task.textContent = myInput.value;
            task.style.textDecoration = "none";

            editBtn.textContent = "Edit";
            myInput.value = "";

            if (taskData.saved) {

                const index = tasks.indexOf(taskData);

                if (index !== -1) {
                    tasks[index] = taskData;

                    localStorage.setItem("tasks",JSON.stringify(tasks));
                }
            }
        }
    };

    saveBtn.onclick = function () {

        taskData.saved = true;

        tasks.push(taskData);

        totalTaskCount++;

        totalTask.textContent = `Total Task: ${totalTaskCount}`;
                       
        localStorage.setItem("tasks", JSON.stringify(tasks));

        saveBtn.remove();
    };

    doneBtn.onclick = function () {


        if (doneBtn.textContent === "Done") {
            taskData.completed = true;
            doneBtn.textContent = "Undo";
            task.style.textDecoration = "line-through";
            completedTaskCount++;
        }
        else {
            taskData.completed = false;
            doneBtn.textContent = "Done";
            task.style.textDecoration = "none";
            completedTaskCount--;
        }

        if(taskData.saved) {

            const index = tasks.indexOf(taskData);

            if (index !== -1) {

                tasks[index] = taskData;

                localStorage.setItem("tasks",JSON.stringify(tasks));
            }
        }
    };

    deleteBtn.onclick = function () {

        if(taskData.saved) {
            const index = tasks.indexOf(taskData);

            if(index !== -1) {

                if(taskData.completed) {
                    completedTaskCount--;
                }

                tasks.splice(index, 1);
                totalTaskCount--;
                localStorage.setItem("tasks",JSON.stringify(tasks));
            }

            totalTask.textContent = `Total Task: ${totalTaskCount}`;
            completedTask.textContent = `Completed Task: ${completedTaskCount}`;

        }

        taskDiv.remove();
    };

    taskDiv.appendChild(task);
    taskDiv.appendChild(editBtn);

    if (!taskData.saved) {
        taskDiv.appendChild(saveBtn);
    }

    taskDiv.appendChild(doneBtn);
    taskDiv.appendChild(deleteBtn);

    taskContainer.appendChild(taskDiv);
}

tasks.forEach(function (task){
    task.saved = true;
    createTask(task);
});

addBtn.onclick = function() {
    if (myInput.value.trim() === ""){
        myLabel.textContent = "You must Enter your task";
        myLabel.style.display = "block";
    }
    else {
        myLabel.textContent = "";
        myLabel.style.display = "none";

        const newTask = {
            text: myInput.value,
            completed: false,
            saved: false
        }
                       
        createTask(newTask);
                   
        myInput.value = "";

    }
};

myInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addBtn.click();
    }
}); 