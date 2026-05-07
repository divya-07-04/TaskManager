const api = "http://localhost:8081";

async function addTask() {

    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;

    if(title === "" || description === ""){
        alert("Please fill all fields");
        return;
    }

    let task = {
        title:title,
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

    document.getElementById("title").value="";
    document.getElementById("description").value="";

    loadTasks();
}

async function loadTasks() {

    let response = await fetch(api + "/tasks");

    let data = await response.json();

    let output="";

    if(data.length === 0){

        output = `
            <div class="empty">
                No Tasks Available
            </div>
        `;
    }

    data.forEach(task => {

        output += `
        
        <div class="task-card">

            <h3>${task.title}</h3>

            <p>${task.description}</p>

            <span class="status"
            style="
            background:${task.status==='Completed' ? '#2ecc71' : '#ffeaa7'};
            color:${task.status==='Completed' ? 'white' : 'black'};
            ">
            ${task.status}
            </span>

            <div class="button-group">

                <button class="complete-btn"
                onclick="completeTask(${task.id})">
                Complete
                </button>

                <button class="delete-btn"
                onclick="deleteTask(${task.id})">
                Delete
                </button>

            </div>

        </div>
        `;
    });

    document.getElementById("taskList").innerHTML = output;
}

async function deleteTask(id){

    await fetch(api + "/delete/" + id,{
        method:"DELETE"
    });

    loadTasks();
}

async function completeTask(id){

    let response = await fetch(api + "/tasks");

    let tasks = await response.json();

    let task = tasks.find(t => t.id === id);

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

loadTasks();