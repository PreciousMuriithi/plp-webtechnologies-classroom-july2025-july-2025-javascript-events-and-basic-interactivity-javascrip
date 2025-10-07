document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header");
    header.addEventListener("click", () => {
        const welcomeText = document.querySelector("h2");
        welcomeText.textContent = "You clicked the header!";
    });

    const image = document.querySelector("img");
    image.addEventListener("click", () => {
        image.classList.toggle("highlight");
    });

    const form = document.querySelector("form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const newItem = document.createElement("li");
        newItem.textContent = `${name} - ${email}`;
        document.querySelector("ol").appendChild(newItem);
        form.reset();
    });

    const counter = document.getElementById("counter");
    const incrementButton = document.getElementById("incrementButton");
    let count = 0;

    incrementButton.addEventListener("click", () => {
        count++;
        counter.textContent = count;
    });

    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach(question => {
        question.addEventListener("click", () => {
            const answer = question.nextElementSibling;
            answer.style.display = answer.style.display === "none" ? "block" : "none";
        });
    });

    const dropdownButton = document.getElementById("dropdownButton");
    const dropdownMenu = document.getElementById("dropdownMenu");

    dropdownButton.addEventListener("click", () => {
        dropdownMenu.style.display = dropdownMenu.style.display === "none" ? "block" : "none";
    });

    // Close the dropdown if the user clicks outside of it
    window.addEventListener("click", (event) => {
        if (!event.target.matches('#dropdownButton')) {
            dropdownMenu.style.display = "none";
        }
    });

    const checkbox = document.getElementById("toggleCheckbox");
    const themeToggle = document.getElementById("themeToggle");

    // Initialize theme based on localStorage
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark");
        checkbox.checked = true;
    } else {
        document.body.classList.add("light");
    }

    // Handle checkbox change for theme toggle
    checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
            document.body.classList.remove("light");
            document.body.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.body.classList.remove("dark");
            document.body.classList.add("light");
            localStorage.setItem("theme", "light");
        }
    });

    document.getElementById("registrationForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission

        // Clear previous error messages
        clearErrors();

        // Get form values
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        let isValid = true;

        // Validate name
        if (name === "") {
            showError("nameError", "Name is required.");
            isValid = false;
        }

        // Validate email using regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError("emailError", "Please enter a valid email address.");
            isValid = false;
        }

        // Validate password
        if (password.length < 6) {
            showError("passwordError", "Password must be at least 6 characters long.");
            isValid = false;
        }

        // Validate confirm password
        if (password !== confirmPassword) {
            showError("confirmPasswordError", "Passwords do not match.");
            isValid = false;
        }

        // If valid, show success message
        if (isValid) {
            const successMessage = document.getElementById("successMessage");
            successMessage.textContent = "Registration successful!";
            successMessage.classList.add("show"); // Show success message
            document.getElementById("registrationForm").reset(); // Reset form
        }
    });

    // Function to show error messages
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
        errorElement.classList.add("show"); // Show error message
    }

    // Function to clear error messages
    function clearErrors() {
        const errorElements = document.querySelectorAll(".error-message");
        errorElements.forEach(element => {
            element.textContent = "";
            element.classList.remove("show"); // Hide error message
        });
        const successMessage = document.getElementById("successMessage");
        successMessage.textContent = "";
        successMessage.classList.remove("show"); // Hide success message
    }
});
