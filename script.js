const inputBox = document.getElementById("input-Box");
const descriptionBox = document.getElementById("description-Box");
const listContainer = document.getElementById("list-Container");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
    listContainer.innerHTML = ''; 
    tasks.forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = `<strong>${task.title}</strong>: ${task.description}`;
        li.dataset.id = task.id;
        if (task.status) li.classList.add("checked");
        
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        listContainer.appendChild(li);
    });
}

function addTask() {
    const title = inputBox.value.trim();
    const description = descriptionBox.value.trim();
    if (title === '' || description === '') {
        alert("Ви повинні заповнити всі поля");
        return;
    }

    const newTask = {
        id: Date.now(),
        title: title,
        description: description,
        status: false
    };
    tasks.push(newTask); 
    saveData();
    renderTasks();
    inputBox.value = '';
    descriptionBox.value = '';
}

listContainer.addEventListener("click", function(e) {
    const taskId = e.target.closest("li").dataset.id;
    if (e.target.tagName === "LI") {
        const task = tasks.find(t => t.id == taskId);
        task.status = !task.status;
        saveData();
        renderTasks();
    } else if (e.target.tagName === "SPAN") {
        tasks = tasks.filter(t => t.id != taskId);
        saveData();
        renderTasks();
    }
}, false);

function saveData() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

renderTasks();



