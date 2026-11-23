

document.getElementById("welcomeBtn").addEventListener("click", function () {

    document.getElementById("services").scrollIntoView({
        behavior: "smooth"
    });

});


// Service details buttons

const detailButtons = document.querySelectorAll(".detailsBtn");

detailButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const details = this.nextElementSibling;

        details.classList.toggle("show");

        this.textContent = details.classList.contains("show")
            ? "Hide Details"
            : "View Details";

    });

});


// FAQ button

document.getElementById("faqBtn").addEventListener("click", function () {

    const answer = document.getElementById("faqAnswer");

    answer.classList.toggle("show");

    this.textContent = answer.classList.contains("show")
        ? "Hide Answer"
        : "Show Answer";

});


// Notification

document.getElementById("notifyBtn").addEventListener("click", function () {

    const notification = document.getElementById("notification");

    notification.classList.add("show");

    setTimeout(function () {

        notification.classList.remove("show");

    }, 3000);

});


// ==========================================
// PRACTICUM 10: DYNAMIC SERVICE MANAGEMENT
// ==========================================


const serviceName = document.getElementById("serviceName");

const serviceDescription = document.getElementById("serviceDescription");

const addServiceBtn = document.getElementById("addServiceBtn");

const serviceList = document.getElementById("serviceList");

const serviceMessage = document.getElementById("serviceMessage");


// Add service

addServiceBtn.addEventListener("click", function () {

    const name = serviceName.value.trim();

    const description = serviceDescription.value.trim();

    if (name === "" || description === "") {

        serviceMessage.textContent = "Please enter both service details.";

        return;

    }

    const li = document.createElement("li");

    li.textContent = name + " - " + description + " ";

    const editButton = document.createElement("button");

    editButton.textContent = "Edit";

    editButton.className = "editBtn";

    const deleteButton = document.createElement("button");

    deleteButton.textContent = "Delete";

    deleteButton.className = "deleteBtn";

    li.appendChild(editButton);

    li.appendChild(deleteButton);

    serviceList.appendChild(li);

    serviceName.value = "";

    serviceDescription.value = "";

    serviceMessage.textContent = "Service added successfully!";

});


// Edit and delete services

serviceList.addEventListener("click", function (event) {

    const li = event.target.closest("li");

    if (!li) return;

    if (event.target.classList.contains("deleteBtn")) {

        li.remove();

        serviceMessage.textContent = "Service deleted successfully!";

    }

    if (event.target.classList.contains("editBtn")) {

        const newName = prompt("Enter updated service name:");

        if (newName && newName.trim() !== "") {

            const firstTextNode = Array.from(li.childNodes).find(function (node) {
                return node.nodeType === Node.TEXT_NODE;
            });

            if (firstTextNode) {
                firstTextNode.textContent = newName.trim() + " ";
            }

            serviceMessage.textContent = "Service updated successfully!";

        }

    }

});


// ==========================================
// PRACTICUM 11: FORM VALIDATION
// ==========================================


const supportForm = document.getElementById("supportRequestForm");

const formMessage = document.getElementById("formMessage");

supportForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const phone = document.getElementById("phone").value;

    const phonePattern = /^[6-9][0-9]{9}$/;

    if (!phonePattern.test(phone)) {

        document.getElementById("phone").setCustomValidity(
            "Enter a valid 10-digit mobile number."
        );

        document.getElementById("phone").reportValidity();

        return;

    }

    document.getElementById("phone").setCustomValidity("");

    if (supportForm.checkValidity()) {

        formMessage.textContent = "Your support request was submitted successfully!";

        supportForm.reset();

    } else {

        supportForm.reportValidity();

    }

});


// Clear custom phone validation when the user edits it

document.getElementById("phone").addEventListener("input", function () {

    this.setCustomValidity("");

});


// ==========================================
// PRACTICUM 12: API INTEGRATION
// ==========================================


const API_URL = "https://dummyjson.com/comments?limit=10";

const fetchBtn = document.getElementById("fetchBtn");

const feedbackBody = document.getElementById("feedbackBody");

const loadingMessage = document.getElementById("loadingMessage");

const apiStatus = document.getElementById("apiStatus");


// Fetch customer feedback

async function fetchFeedback() {

    loadingMessage.textContent = "Loading customer feedback...";

    apiStatus.textContent = "";

    fetchBtn.disabled = true;

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {

            throw new Error("Unable to retrieve customer feedback.");

        }

        const data = await response.json();

        feedbackBody.innerHTML = "";

        data.comments.forEach(function (comment) {

            const row = document.createElement("tr");

            const idCell = document.createElement("td");

            const nameCell = document.createElement("td");

            const usernameCell = document.createElement("td");

            const feedbackCell = document.createElement("td");

            idCell.textContent = comment.id;

            nameCell.textContent = comment.user.fullName;

            usernameCell.textContent = comment.user.username;

            feedbackCell.textContent = comment.body;

            row.appendChild(idCell);

            row.appendChild(nameCell);

            row.appendChild(usernameCell);

            row.appendChild(feedbackCell);

            feedbackBody.appendChild(row);

        });

        loadingMessage.textContent = "Customer feedback loaded successfully!";

        apiStatus.textContent = "Total Records: " + data.comments.length;

    }

    catch (error) {

        feedbackBody.innerHTML = "";

        loadingMessage.textContent = "Error loading customer feedback.";

        apiStatus.textContent = error.message;

    }

    finally {

        fetchBtn.disabled = false;

        fetchBtn.textContent = "Refresh Customer Feedback";

    }

}


fetchBtn.addEventListener("click", fetchFeedback);


// ==========================================
// PRACTICUM 13: TASK MANAGER WITH LOCAL STORAGE
// ==========================================


// Get HTML elements

const taskForm = document.getElementById("taskForm");

const taskTitle = document.getElementById("taskTitle");

const taskDescription = document.getElementById("taskDescription");

const taskCategory = document.getElementById("taskCategory");

const taskPriority = document.getElementById("taskPriority");

const taskStatus = document.getElementById("taskStatus");

const taskTableBody = document.getElementById("taskTableBody");

const taskMessage = document.getElementById("taskMessage");

const emptyMessage = document.getElementById("emptyMessage");

const saveTaskBtn = document.getElementById("saveTaskBtn");

const cancelEditBtn = document.getElementById("cancelEditBtn");

const taskFormTitle = document.getElementById("taskFormTitle");


// Task array

let tasks = JSON.parse(localStorage.getItem("supportTasks")) || [];


// Variable to track editing task

let editingTaskId = null;


// Save tasks in Local Storage

function saveTasks() {

    localStorage.setItem("supportTasks", JSON.stringify(tasks));

}


// Display all tasks

function displayTasks() {

    taskTableBody.innerHTML = "";

    if (tasks.length === 0) {

        emptyMessage.style.display = "block";

        return;

    }

    emptyMessage.style.display = "none";


    tasks.forEach(function (task) {

        const row = document.createElement("tr");


        // Task ID

        const idCell = document.createElement("td");

        idCell.textContent = task.id;


        // Task Title

        const titleCell = document.createElement("td");

        titleCell.textContent = task.title;


        // Description

        const descriptionCell = document.createElement("td");

        descriptionCell.textContent = task.description;


        // Category

        const categoryCell = document.createElement("td");

        categoryCell.textContent = task.category;


        // Priority

        const priorityCell = document.createElement("td");

        priorityCell.textContent = task.priority;


        // Status dropdown

        const statusCell = document.createElement("td");

        const statusSelect = document.createElement("select");

        statusSelect.className = "status-select";

        const statuses = ["Pending", "In Progress", "Completed"];

        statuses.forEach(function (status) {

            const option = document.createElement("option");

            option.value = status;

            option.textContent = status;

            if (task.status === status) {

                option.selected = true;

            }

            statusSelect.appendChild(option);

        });


        // Update task status

        statusSelect.addEventListener("change", function () {

            updateTaskStatus(task.id, this.value);

        });

        statusCell.appendChild(statusSelect);


        // Action buttons

        const actionCell = document.createElement("td");

        const actionContainer = document.createElement("div");

        actionContainer.className = "task-action-buttons";


        // Edit button

        const editButton = document.createElement("button");

        editButton.textContent = "Edit";

        editButton.className = "task-edit-btn";

        editButton.addEventListener("click", function () {

            editTask(task.id);

        });


        // Delete button

        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.className = "task-delete-btn";

        deleteButton.addEventListener("click", function () {

            deleteTask(task.id);

        });


        actionContainer.appendChild(editButton);

        actionContainer.appendChild(deleteButton);

        actionCell.appendChild(actionContainer);


        // Add all cells to the row

        row.appendChild(idCell);

        row.appendChild(titleCell);

        row.appendChild(descriptionCell);

        row.appendChild(categoryCell);

        row.appendChild(priorityCell);

        row.appendChild(statusCell);

        row.appendChild(actionCell);


        // Add row to table

        taskTableBody.appendChild(row);

    });

}


// CREATE: Add a new task

taskForm.addEventListener("submit", function (event) {

    event.preventDefault();


    const title = taskTitle.value.trim();

    const description = taskDescription.value.trim();

    const category = taskCategory.value;

    const priority = taskPriority.value;

    const status = taskStatus.value;


    if (!title || !description || !category || !priority || !status) {

        taskMessage.textContent = "Please fill in all the fields.";

        return;

    }


    if (editingTaskId !== null) {

        // UPDATE EXISTING TASK

        const task = tasks.find(function (item) {

            return item.id === editingTaskId;

        });

        if (task) {

            task.title = title;

            task.description = description;

            task.category = category;

            task.priority = priority;

            task.status = status;

            taskMessage.textContent = "Task updated successfully!";

        }

        editingTaskId = null;

        saveTaskBtn.textContent = "Add Task";

        taskFormTitle.textContent = "Add New Task";

        cancelEditBtn.style.display = "none";

    }

    else {

        // CREATE NEW TASK

        const newTask = {

            id: Date.now(),

            title: title,

            description: description,

            category: category,

            priority: priority,

            status: status

        };


        tasks.push(newTask);

        taskMessage.textContent = "Task added successfully!";

    }


    saveTasks();

    displayTasks();

    taskForm.reset();

});


// READ: Display saved tasks

function loadTasks() {

    displayTasks();

}


// UPDATE: Edit task details

function editTask(id) {

    const task = tasks.find(function (item) {

        return item.id === id;

    });


    if (!task) return;


    taskTitle.value = task.title;

    taskDescription.value = task.description;

    taskCategory.value = task.category;

    taskPriority.value = task.priority;

    taskStatus.value = task.status;


    editingTaskId = id;


    saveTaskBtn.textContent = "Update Task";

    taskFormTitle.textContent = "Edit Customer Support Task";

    cancelEditBtn.style.display = "inline-block";


    taskMessage.textContent = "Editing task ID: " + id;


    document.getElementById("task-manager").scrollIntoView({

        behavior: "smooth"

    });

}


// UPDATE: Change task status

function updateTaskStatus(id, newStatus) {

    const task = tasks.find(function (item) {

        return item.id === id;

    });


    if (task) {

        task.status = newStatus;

        saveTasks();

        taskMessage.textContent = "Task status updated successfully!";

    }

}


// DELETE: Remove task

function deleteTask(id) {

    const confirmDelete = confirm("Are you sure you want to delete this task?");

    if (!confirmDelete) return;


    tasks = tasks.filter(function (item) {

        return item.id !== id;

    });


    if (editingTaskId === id) {

        resetTaskForm();

    }


    saveTasks();

    displayTasks();

    taskMessage.textContent = "Task deleted successfully!";

}


// Cancel editing

function resetTaskForm() {

    taskForm.reset();

    editingTaskId = null;

    saveTaskBtn.textContent = "Add Task";

    taskFormTitle.textContent = "Add New Task";

    cancelEditBtn.style.display = "none";

    taskMessage.textContent = "";

}


cancelEditBtn.addEventListener("click", resetTaskForm);


// Load saved tasks when webpage opens

loadTasks();


// Hide Cancel Edit button initially

cancelEditBtn.style.display = "none";