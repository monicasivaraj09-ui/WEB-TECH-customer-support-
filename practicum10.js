
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


    // ADD CONTENT USING TEXTCONTENT

    span.textContent = name;

    p.textContent = description;

    editBtn.textContent = "Edit";

    deleteBtn.textContent = "Delete";


    // SET BUTTON ATTRIBUTES

    editBtn.setAttribute("class", "editBtn");

    deleteBtn.setAttribute("class", "deleteBtn");


    // ADD ELEMENTS TO LIST

    div.appendChild(span);

    div.appendChild(p);

    li.appendChild(div);

    li.appendChild(editBtn);

    li.appendChild(deleteBtn);

    serviceList.appendChild(li);


    // CLEAR INPUT FIELDS

    document.getElementById("serviceName").value = "";

    document.getElementById("serviceDescription").value = "";


    // DISPLAY MESSAGE

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


        // UPDATE CONTENT

        span.textContent = newName.trim();

        p.textContent = newDescription.trim();


        message.textContent = "Service updated successfully!";

    }

});
