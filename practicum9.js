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

    notification.classList.add("show");

    setTimeout(function() {

        notification.classList.remove("show");

    }, 3000);

});