let currentUser =
JSON.parse(localStorage.getItem("user"));

if(!currentUser){

    window.location.href = "login.html";
}

const api = "http://localhost:8081";

document.getElementById("username")
.innerText = currentUser.name;

document.getElementById("roleBadge")
.innerText = currentUser.role;

async function addTask() {

    if(currentUser.role !== "ADMIN"){

        alert("Only ADMIN can create tasks");

        return;
    }

    let title =
    document.getElementById("title").value;

    let project =
    document.getElementById("project").value;

    let assignedTo =
    document.getElementById("assignedTo").value;

    let dueDate =
    document.getElementById("dueDate").value;

    let description =
    document.getElementById("description").value;

    if(
        title === "" ||
        project === "" ||
        assignedTo === "" ||
        dueDate === "" ||
        description === ""
    ){
        alert("Please fill all fields");

        return;
    }

    let task = {

        title:title,

        project:project,

        assignedTo:assignedTo,

        dueDate:dueDate,

        description:description,

        status:"Pending"
    };

    await fetch(api + "/add",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(task)
    });

    clearForm();

    loadTasks();
}

function clearForm(){

    document.getElementById("title").value = "";

    document.getElementById("project").value = "";

    document.getElementById("assignedTo").value = "";

    document.getElementById("dueDate").value = "";

    document.getElementById("description").value = "";
}

async function loadTasks() {

    let response =
    await fetch(api + "/tasks");

    let data =
    await response.json();

    let output = "";

    if(data.length === 0){

        output = `
            <div class="empty">
                No Tasks Available
            </div>
        `;
    }

    data.forEach(task => {

        let today = new Date();

        let taskDate =
        new Date(task.dueDate);

        let overdue =
        task.status !== "Completed" &&
        taskDate < today;

        output += `

        <div class="task-card">

            <h3>${task.title}</h3>

            <p>
                <b>Project:</b> ${task.project}
            </p>

            <p>
                <b>Assigned To:</b>
                ${task.assignedTo}
            </p>

            <p>
                ${task.description}
            </p>

            <p class="${overdue ? 'overdue' : ''}">

                <b>Due Date:</b>
                ${task.dueDate}

            </p>

            <span class="tag"
            style="
            background:
            ${task.status === 'Completed'
                ? '#22c55e'
                : '#facc15'};

            color:
            ${task.status === 'Completed'
                ? 'white'
                : 'black'};
            ">
            ${task.status}
            </span>

            <div class="button-group">

                <button class="complete-btn"
                onclick="completeTask(${task.id})">
                Complete
                </button>

                ${
                    currentUser.role === "ADMIN"
                    ?
                    `
                    <button class="delete-btn"
                    onclick="deleteTask(${task.id})">
                    Delete
                    </button>
                    `
                    :
                    ""
                }

            </div>

        </div>
        `;
    });

    document.getElementById("taskList")
    .innerHTML = output;
}

async function deleteTask(id){

    await fetch(api + "/delete/" + id,{

        method:"DELETE"
    });

    loadTasks();
}

async function completeTask(id){

    let response =
    await fetch(api + "/tasks");

    let tasks =
    await response.json();

    let task =
    tasks.find(t => t.id === id);

    task.status = "Completed";

    await fetch(api + "/add",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(task)
    });

    loadTasks();
}

function logout(){

    localStorage.removeItem("user");

    window.location.href = "login.html";
}

loadTasks();