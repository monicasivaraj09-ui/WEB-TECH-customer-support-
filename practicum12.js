
// ==========================================
// PRACTICUM 9 - ANIMATIONS AND INTERACTIONS
// ==========================================


// WELCOME BUTTON

document.getElementById("welcomeBtn").addEventListener("click", function() {

    document.getElementById("services").scrollIntoView({
        behavior: "smooth"
    });

});


// SERVICE CARD DETAILS

let detailButtons = document.querySelectorAll(".detailsBtn");

detailButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        let details = button.nextElementSibling;

        details.classList.toggle("show");

        if (details.classList.contains("show")) {
            button.textContent = "Show Less";
        } else {
            button.textContent = "View Details";
        }

    });

});


// FAQ SECTION

document.getElementById("faqBtn").addEventListener("click", function() {

    let answer = document.getElementById("faqAnswer");

    answer.classList.toggle("show");

    let symbol = this.querySelector("span");

    if (answer.classList.contains("show")) {
        symbol.textContent = "-";
    } else {
        symbol.textContent = "+";
    }

});


// NOTIFICATION

document.getElementById("notifyBtn").addEventListener("click", function() {

    let notification = document.getElementById("notification");

    notification.classList.remove("show");

    void notification.offsetWidth;

    notification.classList.add("show");

    setTimeout(function() {

        notification.classList.remove("show");

    }, 3000);

});


// ==========================================
// PRACTICUM 10 - DOM MANIPULATION
// ==========================================


// GET HTML ELEMENTS

let addButton = document.getElementById("addServiceBtn");

let serviceList = document.getElementById("serviceList");

let message = document.getElementById("serviceMessage");


// ADD NEW SERVICE

addButton.addEventListener("click", function() {

    let name = document.getElementById("serviceName").value.trim();

    let description = document.getElementById("serviceDescription").value.trim();

    if (name === "" || description === "") {

        message.textContent = "Please enter all service details.";

        return;

    }


    // CREATE ELEMENTS

    let li = document.createElement("li");

    let div = document.createElement("div");

    let span = document.createElement("span");

    let p = document.createElement("p");

    let editBtn = document.createElement("button");

    let deleteBtn = document.createElement("button");


    // ADD CONTENT

    span.textContent = name;

    p.textContent = description;

    editBtn.textContent = "Edit";

    deleteBtn.textContent = "Delete";


    // SET ATTRIBUTES

    editBtn.setAttribute("class", "editBtn");

    deleteBtn.setAttribute("class", "deleteBtn");


    // APPEND ELEMENTS

    div.appendChild(span);

    div.appendChild(p);

    li.appendChild(div);

    li.appendChild(editBtn);

    li.appendChild(deleteBtn);

    serviceList.appendChild(li);


    // CLEAR INPUTS

    document.getElementById("serviceName").value = "";

    document.getElementById("serviceDescription").value = "";


    message.textContent = "Service added successfully!";

});


// EDIT AND DELETE SERVICES

serviceList.addEventListener("click", function(event) {

    let item = event.target.closest("li");

    if (!item) return;


    // DELETE SERVICE

    if (event.target.classList.contains("deleteBtn")) {

        item.remove();

        message.textContent = "Service deleted successfully!";

    }


    // EDIT SERVICE

    if (event.target.classList.contains("editBtn")) {

        let span = item.querySelector("span");

        let p = item.querySelector("p");


        let newName = prompt(
            "Enter updated service name:",
            span.textContent
        );

        if (newName === null) return;


        let newDescription = prompt(
            "Enter updated description:",
            p.textContent
        );

        if (newDescription === null) return;


        if (newName.trim() === "" || newDescription.trim() === "") {

            message.textContent = "Service details cannot be empty.";

            return;

        }


        span.textContent = newName.trim();

        p.textContent = newDescription.trim();

        message.textContent = "Service updated successfully!";

    }

});


// ==========================================
// PRACTICUM 11 - FORM VALIDATION
// ==========================================


// GET FORM ELEMENTS

let supportForm = document.getElementById("supportRequestForm");

let phoneInput = document.getElementById("phone");

let formMessage = document.getElementById("formMessage");


// CUSTOM PHONE VALIDATION

phoneInput.addEventListener("input", function() {

    if (
        phoneInput.value !== "" &&
        !/^[6-9][0-9]{9}$/.test(phoneInput.value)
    ) {

        phoneInput.setCustomValidity(
            "Enter a valid 10-digit mobile number starting with 6, 7, 8 or 9."
        );

    } else {

        phoneInput.setCustomValidity("");

    }

});


// FORM SUBMISSION

supportForm.addEventListener("submit", function(event) {

    event.preventDefault();


    if (supportForm.checkValidity()) {

        formMessage.textContent =
            "Your support request has been submitted successfully!";

        formMessage.style.color = "green";

        supportForm.reset();

        phoneInput.setCustomValidity("");

    } else {

        supportForm.reportValidity();

        formMessage.textContent =
            "Please correct the errors in the form.";

        formMessage.style.color = "red";

    }

});


// CLEAR FORM MESSAGE

supportForm.addEventListener("reset", function() {

    formMessage.textContent = "";

});


// ==========================================
// PRACTICUM 12 - API INTEGRATION
// ==========================================


// API ENDPOINT

const API_URL = "https://dummyjson.com/comments?limit=10";


// GET HTML ELEMENTS

let fetchButton = document.getElementById("fetchBtn");

let feedbackBody = document.getElementById("feedbackBody");

let loadingMessage = document.getElementById("loadingMessage");

let apiStatus = document.getElementById("apiStatus");


// FETCH CUSTOMER FEEDBACK

async function fetchFeedback() {

    try {

        // SHOW LOADING MESSAGE

        loadingMessage.textContent = "Loading customer feedback...";

        apiStatus.textContent = "";

        fetchButton.disabled = true;

        fetchButton.textContent = "Loading...";


        // FETCH DATA FROM API

        const response = await fetch(API_URL);


        // CHECK RESPONSE

        if (!response.ok) {

            throw new Error("Unable to retrieve customer feedback.");

        }


        // CONVERT RESPONSE INTO JSON

        const data = await response.json();


        // CLEAR PREVIOUS DATA

        feedbackBody.innerHTML = "";


        // CHECK API DATA

        if (!data.comments || data.comments.length === 0) {

            loadingMessage.textContent = "No customer feedback available.";

            return;

        }


        // DISPLAY DATA USING DOM MANIPULATION

        data.comments.forEach(function(comment) {


            // CREATE TABLE ROW

            let row = document.createElement("tr");


            // CREATE TABLE DATA CELLS

            let idCell = document.createElement("td");

            let nameCell = document.createElement("td");

            let emailCell = document.createElement("td");

            let feedbackCell = document.createElement("td");


            // ADD API DATA

            idCell.textContent = comment.id;

            nameCell.textContent = comment.user.fullName;

            emailCell.textContent = comment.user.username;

            feedbackCell.textContent = comment.body;


            // APPEND CELLS TO ROW

            row.appendChild(idCell);

            row.appendChild(nameCell);

            row.appendChild(emailCell);

            row.appendChild(feedbackCell);


            // APPEND ROW TO TABLE

            feedbackBody.appendChild(row);

        });


        // SUCCESS MESSAGE

        loadingMessage.textContent = "Customer feedback loaded successfully!";

        apiStatus.textContent =
            "Total customer feedback records: " + data.comments.length;

    }


    // ERROR HANDLING

    catch (error) {

        feedbackBody.innerHTML = "";

        loadingMessage.textContent =
            "Failed to load customer feedback. Please try again.";

        apiStatus.textContent = error.message;

    }


    // EXECUTES WHETHER SUCCESS OR ERROR OCCURS

    finally {

        fetchButton.disabled = false;

        fetchButton.textContent = "Refresh Customer Feedback";

    }

}


// BUTTON CLICK EVENT

fetchButton.addEventListener("click", fetchFeedback);

