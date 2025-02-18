document.addEventListener("DOMContentLoaded", function () {
    const formContainer = document.getElementById("appointment-form-container");
    const form = document.getElementById("appointment-form");
    const closeFormBtn = document.getElementById("close-form");
    const bookButtons = document.querySelectorAll(".book-btn");
    const appointmentList = document.getElementById("appointment-list");
  
    bookButtons.forEach(button => {
        button.addEventListener("click", () => {
            document.getElementById("service").value = button.dataset.service;
            formContainer.style.display = "block";
        });
    });
  
    closeFormBtn.addEventListener("click", () => {
        formContainer.style.display = "none";
    });

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const service = document.getElementById("service").value;
        const datetime = document.getElementById("datetime").value;
        const terms = document.getElementById("terms").checked;
        
        if (!name || !email.includes("@") || phone.length !== 10 || new Date(datetime) <= new Date() || !terms) {
            alert("Please fill in the form correctly.");
            return;
        }
        
        const appointment = {
            name, email, phone, service, datetime, status: "Pending"
        };
        saveAppointment(appointment);
        displayAppointments();
        form.reset();
        formContainer.style.display = "none";
        alert(Thank you, ${name}! Your appointment for ${service} on ${datetime} is confirmed.);
    });
  
    function saveAppointment(appointment) {
        let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
        appointments.push(appointment);
        localStorage.setItem("appointments", JSON.stringify(appointments));
    }
    
    function displayAppointments() {
        appointmentList.innerHTML = "";
        let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
        appointments.forEach(app => {
            const row = document.createElement("tr");
            row.innerHTML = <td>${app.name}</td><td>${app.service}</td><td>${app.datetime}</td><td>${app.status}</td>;
            appointmentList.appendChild(row);
        });
    }
    
    displayAppointments();
});
