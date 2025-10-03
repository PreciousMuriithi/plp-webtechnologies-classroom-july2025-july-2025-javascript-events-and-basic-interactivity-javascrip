# 🧠 Assignment: Interactive Web Pages with JavaScript

Welcome to the exciting world of interactivity! This assignment is all about **making your web pages feel alive**. You’ll learn how to respond to user actions, build engaging components, and validate form input—without reloading the page. This is where JavaScript gets fun, practical, and powerful. 🚀

---

## 🎉 Part 1: JavaScript Event Handling and Interactive Elements

Let’s start with the basics of **event handling**. You'll set up JavaScript to listen for user actions like clicks, mouseovers, keyboard input, and more—and respond to them in meaningful ways.

**Goal:** Use event listeners to react to user behavior and trigger changes on the page (e.g., showing messages, toggling classes, hiding/showing content).

---

## 🎮 Part 2: Building Interactive Elements

Now it’s time to apply what you’ve learned by creating your own mini interactive features. You can build things like:

* A light/dark mode toggle
* A counter or button game
* A collapsible FAQ section
* A simple dropdown menu
* A tabbed interface

**Goal:** Use DOM manipulation + events to make the page dynamic and engaging. Be creative!

---

## 📋✅ Part 3: Form Validation with JavaScript

Forms are essential to the web—and validating them properly is key to good user experience. You’ll build a form with multiple input fields (name, email, password, etc.) and write JavaScript to validate each field when the user submits or types.

**Goal:** Prevent incorrect form submissions by writing custom validation logic using conditions and regular expressions. Show user-friendly error messages and success feedback.

---

## Deliverables

* `index.html`: Your structured web page with at least one form and several interactive sections
* `script.js`: Your JavaScript file with:

  * Event handling for buttons, inputs, or links
  * At least 2 interactive features created from scratch
  * A fully functioning custom form validation (no HTML5-only validation)
* `style.css` (optional but encouraged): To style your interactive elements

Each section of your JavaScript should be commented to explain its purpose.

---

## Outcome

* Use of event listeners and appropriate event types
* Creativity and functionality of interactive elements
* Form validation accuracy and helpfulness of feedback
* Clear, modular, and well-commented JavaScript code
* A clean and functional user experience


// =========================================================
// PART 1 & 2: Interactive Features (Event Handling & DOM Manipulation)
// =========================================================

// --- 1. Light/Dark Mode Toggle ---

const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

/**
 * Toggles the 'dark-mode' class on the body element,
 * changes the button text, and stores the preference in localStorage.
 */
function toggleDarkMode() {
    // 1. Toggle the class on the body
    body.classList.toggle('dark-mode');

    // 2. Update button text based on the current state
    const isDarkMode = body.classList.contains('dark-mode');
    if (isDarkMode) {
        themeToggle.textContent = '🌙 Toggle Light Mode';
    } else {
        themeToggle.textContent = '☀️ Toggle Dark Mode';
    }

    // 3. Store user preference (for persistence across sessions)
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}

// Check localStorage for a previous theme preference on load
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    // Apply dark mode if preference is found
    toggleDarkMode(); 
}

// Event Listener for the Theme Toggle Button (Click event)
themeToggle.addEventListener('click', toggleDarkMode);


// --- 2. Collapsible FAQ Section ---

const faqQuestions = document.querySelectorAll('.faq-question');

/**
 * Event handler for clicking an FAQ question.
 * Toggles the 'open' class on the associated answer element.
 */
function handleFaqClick(event) {
    // Get the button that was clicked
    const questionButton = event.currentTarget;
    
    // The answer is the next sibling element after the button
    const answer = questionButton.nextElementSibling;
    
    // Toggle the 'open' class to reveal/hide the answer
    answer.classList.toggle('open');
}

// Attach a 'click' event listener to every FAQ question button
faqQuestions.forEach(button => {
    button.addEventListener('click', handleFaqClick);
});


// =========================================================
// PART 3: Custom Form Validation
// =========================================================

const form = document.getElementById('registration-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const successMessage = document.getElementById('form-success-message');

// Regular Expressions for Validation
// Name: Only letters, spaces, and hyphens, 2 to 50 characters
const nameRegex = /^[A-Za-z\s-]{2,50}$/; 

// Email: Standard email pattern
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

/* Password: 
   - Must be at least 8 characters long (.{8,})
   - Must contain at least one uppercase letter ((?=.*[A-Z]))
   - Must contain at least one lowercase letter ((?=.*[a-z]))
   - Must contain at least one digit ((?=.*\d))
*/
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;


/**
 * Displays an error message for a specific input field.
 * @param {HTMLElement} inputElement - The input field (e.g., nameInput).
 * @param {string} message - The error message to display.
 */
function displayError(inputElement, message) {
    // Error message element ID is structured as: [input-id]-error
    const errorId = inputElement.id + '-error';
    const errorElement = document.getElementById(errorId);
    
    // Set the message and apply error styling (optional, done via CSS classes in a real app)
    if (errorElement) {
        errorElement.textContent = message;
        inputElement.style.border = '2px solid red'; // Simple inline styling for feedback
    }
}

/**
 * Clears the error message for a specific input field.
 * @param {HTMLElement} inputElement - The input field.
 */
function clearError(inputElement) {
    const errorId = inputElement.id + '-error';
    const errorElement = document.getElementById(errorId);
    
    if (errorElement) {
        errorElement.textContent = '';
        inputElement.style.border = '1px solid #ccc'; // Reset border
    }
}


/**
 * Custom validation function for the Name field.
 * @returns {boolean} True if valid, false otherwise.
 */
function validateName() {
    const nameValue = nameInput.value.trim();
    clearError(nameInput);
    
    if (nameValue === '') {
        displayError(nameInput, 'Name is required.');
        return false;
    }
    
    if (!nameRegex.test(nameValue)) {
        displayError(nameInput, 'Name must be 2-50 characters, only letters, spaces, or hyphens.');
        return false;
    }
    
    return true;
}

/**
 * Custom validation function for the Email field.
 * @returns {boolean} True if valid, false otherwise.
 */
function validateEmail() {
    const emailValue = emailInput.value.trim();
    clearError(emailInput);
    
    if (emailValue === '') {
        displayError(emailInput, 'Email is required.');
        return false;
    }
    
    if (!emailRegex.test(emailValue)) {
        displayError(emailInput, 'Please enter a valid email address.');
        return false;
    }
    
    return true;
}

/**
 * Custom validation function for the Password field.
 * @returns {boolean} True if valid, false otherwise.
 */
function validatePassword() {
    const passwordValue = passwordInput.value;
    clearError(passwordInput);

    if (passwordValue === '') {
        displayError(passwordInput, 'Password is required.');
        return false;
    }
    
    if (!passwordRegex.test(passwordValue)) {
        displayError(passwordInput, 'Password must be 8+ chars, incl. uppercase, lowercase, and a digit.');
        return false;
    }
    
    return true;
}

/**
 * Main form submission handler.
 * Runs all validation functions and prevents submission if any fail.
 * @param {Event} e - The form submission event.
 */
function handleFormSubmit(e) {
    // 1. Prevent default HTML form submission
    e.preventDefault(); 
    
    // Clear previous success message
    successMessage.textContent = '';
    
    // 2. Run all validation checks
    // Use short-circuiting AND (&&) to ensure all functions run,
    // and the final result (isFormValid) is true only if ALL are true.
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    
    const isFormValid = isNameValid && isEmailValid && isPasswordValid;

    // 3. Process submission based on validity
    if (isFormValid) {
        // Form is valid!
        
        // ***********************************************
        // * In a real application, you would send data  *
        // * to a server using the Fetch API here.       *
        // ***********************************************
        
        // Show success message and reset the form
        successMessage.textContent = '✅ Registration successful! Data validated and submitted.';
        form.reset();
        
        // Clear success message after a few seconds
        setTimeout(() => {
            successMessage.textContent = '';
        }, 5000);
    } else {
        // Form is invalid - errors are already displayed by the validation functions
        console.log('Form submission failed due to validation errors.');
    }
}

// Event Listener for the Form Submission
form.addEventListener('submit', handleFormSubmit);

// Optional: Add 'blur' or 'input' listeners for real-time validation feedback
// This provides a better user experience by flagging errors immediately.
nameInput.addEventListener('blur', validateName);
emailInput.addEventListener('blur', validateEmail);
passwordInput.addEventListener('blur', validatePassword);


