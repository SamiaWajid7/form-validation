// Selecting form and input elements
const form = document.querySelector("form");
const fullnameInput = document.getElementById("fullname");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const password2Input = document.getElementById("password2");
const dateInput = document.getElementById("date");
const passToggleBtn = document.getElementById("pass-toggle-btn");
const pass2ToggleBtn = document.getElementById("pass2-toggle-btn");

// Function to display error messages
const showError = (field, errorText) => {
    field.classList.add("error");
    // Remove existing error message if any
    const existingError = field.closest(".form-group").querySelector(".error-text");
    if (existingError) existingError.remove();
    const errorElement = document.createElement("small");
    errorElement.classList.add("error-text");
    errorElement.innerText = errorText;
    field.closest(".form-group").appendChild(errorElement);
}

// Function to clear error messages
const clearError = (field) => {
    field.classList.remove("error");
    const errorElement = field.closest(".form-group").querySelector(".error-text");
    if (errorElement) errorElement.remove();
}

// Function to handle form submission
const handleFormData = (e) => {
    e.preventDefault();

    // Getting trimmed values from input fields
    const fullname = fullnameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const password2 = password2Input.value.trim();
    const date = dateInput.value;
    // const gender = genderInput.value;

    // Regular expression pattern for email validation
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

    // Clearing previous error messages
    document.querySelectorAll(".form-group .error").forEach(field => field.classList.remove("error"));
    document.querySelectorAll(".error-text").forEach(errorText => errorText.remove());

    // Performing validation checks
    if (fullname === "") {
        showError(fullnameInput, "Enter your full name");
    }

    if (!emailPattern.test(email)) {
        showError(emailInput, "Enter a valid email address");
    }

    if (password === "") {
        showError(passwordInput, "Enter your password");
    }
    else if (password.length < 6) {
        showError(passwordInput, "Password must contain at least six characters.");
    }

    if (password2 === "") {
        showError(password2Input, "Enter your password");
    }
    else if (password2.length < 6) {
        showError(password2Input, "Password must contain at least six characters.");
    }
    else if (password !== password2) {
        showError(password2Input, "Password does not match.");
    }

    if (date === "") {
        showError(dateInput, "Select your date of birth");
    }
   
    // if (gender === "") {
    //     showError(genderInput, "Select your gender");
    // }

    // Checking for any remaining errors before form submission
    const errorInputs = document.querySelectorAll(".form-group .error");
    if (errorInputs.length > 0) return;

    // Submitting the form
    form.submit();
}

// Event listener for input fields to clear errors on change
[fullnameInput, emailInput, passwordInput, password2Input, dateInput].forEach(input => {
    input.addEventListener("input", () => clearError(input));
});

// Toggling password visibility
passToggleBtn.addEventListener('click', () => {
    passToggleBtn.className = passwordInput.type === "password" ? "fa-solid fa-eye-slash" : "fa-solid fa-eye";
    passwordInput.type = passwordInput.type === "password" ? "text" : "password";
});
pass2ToggleBtn.addEventListener('click', () => {
    pass2ToggleBtn.className = password2Input.type === "password" ? "fa-solid fa-eye-slash" : "fa-solid fa-eye";
    password2Input.type = password2Input.type === "password" ? "text" : "password";
});

// Handling form submission event
form.addEventListener("submit", handleFormData);
