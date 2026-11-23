// ======================================
// CUSTOMER SUPPORT PORTAL
// PRACTICUM 14
// ======================================


// ======================================
// NOTIFICATION
// ======================================

function showNotification() {

    alert("Welcome! Our Customer Support Team is ready to help.");

}


// ======================================
// SELECT SERVICE
// ======================================

function selectService(service) {

    document.querySelector("#taskCategory").value = service;

    document.querySelector("#taskTitle").focus();

    alert(service + " Support Selected");

}


// ======================================
// DYNAMIC SERVICE MANAGEMENT
// ======================================

const serviceInput = document.querySelector("#serviceInput");

const addService = document.querySelector("#addService");

const serviceList = document.querySelector("#serviceList");


addService.addEventListener("click", function () {

    const serviceName = serviceInput.value.trim();

    if (serviceName === "") {

        alert("Please enter a service name");

        return;

    }

    const li = document.createElement("li");

    li.textContent = serviceName;

    serviceList.appendChild(li);

    serviceInput.value = "";

});


// ======================================
// CUSTOMER SUPPORT TASK MANAGER
// ======================================


// LOAD EXISTING LOCAL STORAGE DATA

let supportTasks = JSON.parse(
    localStorage.getItem("supportTasks")
) || [];

let editIndex = -1;


// HTML ELEMENTS

const taskTitle = document.querySelector("#taskTitle");

const taskDescription = document.querySelector("#taskDescription");

const taskCategory = document.querySelector("#taskCategory");

const taskPriority = document.querySelector("#taskPriority");

const addTask = document.querySelector("#addTask");

const taskTable = document.querySelector("#taskTable");


// ======================================
// ADD AND UPDATE TASK
// ======================================

addTask.addEventListener("click", function () {

    const title = taskTitle.value.trim();

    const description = taskDescription.value.trim();

    const category = taskCategory.value;

    const priority = taskPriority.value;


    if (
        title === "" ||
        description === "" ||
        category === "" ||
        priority === ""
    ) {

        alert("Please fill all task details");

        return;

    }


    if (editIndex === -1) {

        const task = {

            id: Date.now(),

            title: title,

            description: description,

            category: category,

            priority: priority,

            status: "Pending"

        };


        supportTasks.push(task);

        alert("Task Added Successfully");

    }

    else {

        supportTasks[editIndex].title = title;

        supportTasks[editIndex].description = description;

        supportTasks[editIndex].category = category;

        supportTasks[editIndex].priority = priority;

        editIndex = -1;

        addTask.textContent = "Add Task";

        alert("Task Updated Successfully");

    }


    saveTasks();

    displayTasks();

    clearTaskForm();

});


// ======================================
// CLEAR FORM
// ======================================

function clearTaskForm() {

    taskTitle.value = "";

    taskDescription.value = "";

    taskCategory.value = "";

    taskPriority.value = "";

}


// ======================================
// SAVE TO LOCAL STORAGE
// ======================================

function saveTasks() {

    localStorage.setItem(
        "supportTasks",
        JSON.stringify(supportTasks)
    );

}


// ======================================
// DISPLAY TASKS
// ======================================

function displayTasks() {

    taskTable.innerHTML = "";


    supportTasks.forEach(function (task, index) {

        const row = document.createElement("tr");


        let statusClass = "status-pending";


        if (task.status === "In Progress") {

            statusClass = "status-progress";

        }

        else if (task.status === "Completed") {

            statusClass = "status-completed";

        }


        row.innerHTML = `

            <td>${index + 1}</td>

            <td>${escapeHTML(task.title)}</td>

            <td>${escapeHTML(task.description)}</td>

            <td>${escapeHTML(task.category)}</td>

            <td>${escapeHTML(task.priority)}</td>

            <td>

                <span class="${statusClass}">

                    ${escapeHTML(task.status)}

                </span>

            </td>

            <td>

                <button onclick="editTask(${task.id})">
                    Edit
                </button>

                <button onclick="updateStatus(${task.id})">
                    Update Status
                </button>

                <button onclick="deleteTask(${task.id})">
                    Delete
                </button>

            </td>

        `;


        taskTable.appendChild(row);

    });


    document.querySelector("#taskCount").textContent =

        "Total Tasks: " + supportTasks.length;

}


// ======================================
// SAFE DISPLAY OF USER TEXT
// ======================================

function escapeHTML(value) {

    return String(value).replace(/[&<>"']/g, function (character) {

        const entities = {

            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"

        };

        return entities[character];

    });

}


// ======================================
// EDIT TASK
// ======================================

function editTask(id) {

    const task = supportTasks.find(function (item) {

        return item.id === id;

    });


    if (!task) {

        return;

    }


    editIndex = supportTasks.findIndex(function (item) {

        return item.id === id;

    });


    taskTitle.value = task.title;

    taskDescription.value = task.description;

    taskCategory.value = task.category;

    taskPriority.value = task.priority;


    addTask.textContent = "Update Task";


    document.querySelector(".task-form").scrollIntoView({

        behavior: "smooth"

    });

}


// ======================================
// DELETE TASK
// ======================================

function deleteTask(id) {

    if (confirm("Are you sure you want to delete this task?")) {

        supportTasks = supportTasks.filter(function (task) {

            return task.id !== id;

        });


        saveTasks();

        displayTasks();

        editIndex = -1;

        addTask.textContent = "Add Task";

        clearTaskForm();

    }

}


// ======================================
// UPDATE TASK STATUS
// ======================================

function updateStatus(id) {

    const task = supportTasks.find(function (item) {

        return item.id === id;

    });


    if (!task) {

        return;

    }


    if (task.status === "Pending") {

        task.status = "In Progress";

    }

    else if (task.status === "In Progress") {

        task.status = "Completed";

    }

    else {

        task.status = "Pending";

    }


    saveTasks();

    displayTasks();

}


// ======================================
// PRACTICUM 14
// SEARCH AND FILTER SYSTEM
// ======================================


// SELECT FILTER ELEMENTS

const searchTask = document.querySelector("#searchTask");

const filterCategory = document.querySelector("#filterCategory");

const filterPriority = document.querySelector("#filterPriority");

const filterStatus = document.querySelector("#filterStatus");

const resetFilters = document.querySelector("#resetFilters");


// ======================================
// FILTER TASKS
// ======================================

function filterTasks() {

    const searchValue = searchTask.value.toLowerCase();

    const categoryValue = filterCategory.value;

    const priorityValue = filterPriority.value;

    const statusValue = filterStatus.value;


    const filteredTasks = supportTasks.filter(function (task) {

        const matchesSearch =

            task.title.toLowerCase().includes(searchValue) ||

            task.description.toLowerCase().includes(searchValue);


        const matchesCategory =

            categoryValue === "All" ||

            task.category === categoryValue;


        const matchesPriority =

            priorityValue === "All" ||

            task.priority === priorityValue;


        const matchesStatus =

            statusValue === "All" ||

            task.status === statusValue;


        return (

            matchesSearch &&

            matchesCategory &&

            matchesPriority &&

            matchesStatus

        );

    });


    displayFilteredTasks(filteredTasks);

}


// ======================================
// DISPLAY FILTERED TASKS
// ======================================

function displayFilteredTasks(tasks) {

    taskTable.innerHTML = "";


    tasks.forEach(function (task) {

        const row = document.createElement("tr");


        let statusClass = "status-pending";


        if (task.status === "In Progress") {

            statusClass = "status-progress";

        }

        else if (task.status === "Completed") {

            statusClass = "status-completed";

        }


        row.innerHTML = `

            <td>${task.id}</td>

            <td>${escapeHTML(task.title)}</td>

            <td>${escapeHTML(task.description)}</td>

            <td>${escapeHTML(task.category)}</td>

            <td>${escapeHTML(task.priority)}</td>

            <td>

                <span class="${statusClass}">

                    ${escapeHTML(task.status)}

                </span>

            </td>

            <td>

                <button onclick="editTask(${task.id})">
                    Edit
                </button>

                <button onclick="updateStatus(${task.id})">
                    Update Status
                </button>

                <button onclick="deleteTask(${task.id})">
                    Delete
                </button>

            </td>

        `;


        taskTable.appendChild(row);

    });


    document.querySelector("#taskCount").textContent =

        "Showing " + tasks.length + " of " +

        supportTasks.length + " Tasks";

}


// ======================================
// SEARCH EVENT
// ======================================

searchTask.addEventListener("input", filterTasks);


// ======================================
// CATEGORY FILTER
// ======================================

filterCategory.addEventListener("change", filterTasks);


// ======================================
// PRIORITY FILTER
// ======================================

filterPriority.addEventListener("change", filterTasks);


// ======================================
// STATUS FILTER
// ======================================

filterStatus.addEventListener("change", filterTasks);


// ======================================
// RESET FILTERS
// ======================================

resetFilters.addEventListener("click", function () {

    searchTask.value = "";

    filterCategory.value = "All";

    filterPriority.value = "All";

    filterStatus.value = "All";


    displayTasks();

});


// ======================================
// FAQ INTERACTION
// ======================================

const faqItems = document.querySelectorAll("details");


faqItems.forEach(function (item) {

    item.addEventListener("click", function () {

        item.classList.toggle("active");

    });

});


// ======================================
// REGISTRATION FORM
// ======================================

const registrationForm = document.querySelector("#registrationForm");


registrationForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const name = document.querySelector("#customerName").value.trim();

    const email = document.querySelector("#customerEmail").value.trim();

    const phone = document.querySelector("#customerPhone").value.trim();


    if (name === "" || email === "" || phone === "") {

        alert("Please fill all registration details");

        return;

    }


    if (!/^\d{10}$/.test(phone)) {

        alert("Enter a valid 10-digit phone number");

        return;

    }


    alert("Registration Successful! Welcome " + name);


    registrationForm.reset();

});


// ======================================
// CUSTOMER FEEDBACK
// ======================================

const feedbackForm = document.querySelector("#feedbackForm");

const feedbackTable = document.querySelector("#feedbackTable");


feedbackForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const name = document.querySelector("#feedbackName").value.trim();

    const message = document.querySelector("#feedbackMessage").value.trim();


    if (name === "" || message === "") {

        alert("Please enter feedback details");

        return;

    }


    const row = document.createElement("tr");


    row.innerHTML = `

        <td>${escapeHTML(name)}</td>

        <td>${escapeHTML(message)}</td>

    `;


    feedbackTable.appendChild(row);


    alert("Feedback Submitted Successfully");


    feedbackForm.reset();

});


// ======================================
// INITIAL DISPLAY
// ======================================

displayTasks();