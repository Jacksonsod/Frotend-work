document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('login-btn');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');

    // Email validation pattern
    const emailPattern = /^[a-zA-Z0-9._%+-]+@techinnovators\.com$/;

    // Password validation pattern
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Function to validate email
    function validateEmail() {
        const isValid = emailPattern.test(emailInput.value.trim());
        emailError.style.display = isValid ? 'none' : 'block';
        passwordInput.disabled = !isValid; // Enable password field only if email is valid
        return isValid;
    }

    // Function to validate password
    function validatePassword() {
        const isValid = passwordPattern.test(passwordInput.value.trim());
        passwordError.style.display = isValid ? 'none' : 'block';
        return isValid;
    }

    // Function to toggle the login button
    function toggleLoginButton() {
        const isFormValid = validateEmail() && validatePassword();
        loginBtn.disabled = !isFormValid;
    }

    // Real-time validation for email and password
    emailInput.addEventListener('input', () => {
        validateEmail();
        toggleLoginButton();
    });

    passwordInput.addEventListener('input', () => {
        validatePassword();
        toggleLoginButton();
    });

    // Form submission handler
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        if (validateEmail() && validatePassword()) {
            alert('Login successful!');
            loginForm.reset();
            passwordInput.disabled = true; // Reset field dependency
            loginBtn.disabled = true;
        } else {
            alert('Please fix the errors in the form.');
        }
    });

    // Initial validation check
    toggleLoginButton();
});