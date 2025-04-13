
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registration-form');
    const nameInput = document.getElementById('name');
    const dobInput = document.getElementById('dob');
    const genderInputs = document.getElementsByName('gender');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const passwordInput = document.getElementById('password');
    const submitBtn = document.getElementById('submit-btn');
    const passwordStrength = document.getElementById('password-strength');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');

    // Create error messages dynamically
    const nameError = document.createElement('span');
    nameError.className = 'error-message';
    nameError.style.display = 'none';
    nameError.textContent = 'Name is required.';
    nameInput.parentNode.appendChild(nameError);

    const dobError = document.createElement('span');
    dobError.className = 'error-message';
    dobError.style.display = 'none';
    dobError.textContent = 'Date of Birth is required.';
    dobInput.parentNode.appendChild(dobError);

    const genderError = document.createElement('span');
    genderError.className = 'error-message';
    genderError.style.display = 'none';
    genderError.textContent = 'Gender is required.';
    genderInputs[0].parentNode.appendChild(genderError);

    const phoneError = document.createElement('span');
    phoneError.className = 'error-message';
    phoneError.style.display = 'none';
    phoneError.textContent = 'Phone number must be exactly 10 digits.';
    phoneInput.parentNode.appendChild(phoneError);

    // Set the max date for the Date of Birth field
    const currentDate = new Date().toISOString().split('T')[0];
    dobInput.setAttribute('max', currentDate);

    // Disable all fields except the first one
    dobInput.disabled = true;
    Array.from(genderInputs).forEach(input => input.disabled = true);
    emailInput.disabled = true;
    phoneInput.disabled = true;
    passwordInput.disabled = true;
    submitBtn.disabled = true;

    // Validation functions
    function validateName() {
        const namePattern = /^[A-Za-z\s]+$/; // Allows only letters and spaces
        const isValid = namePattern.test(nameInput.value.trim());
        nameError.textContent = isValid ? '' : 'Name must contain only letters.';
        nameError.style.display = isValid ? 'none' : 'block';
        dobInput.disabled = !isValid; // Enable the next field if valid
        return isValid;
    }

    function validateDOB() {
        const dobValue = dobInput.value.trim();
        const dobDate = new Date(dobValue);
        const isValid = dobValue !== '' && dobDate <= new Date();

        if (!isValid) {
            dobError.textContent = dobValue === ''
                ? 'Date of Birth is required.'
                : 'Date of Birth cannot be in the future.';
            dobError.style.display = 'block';
        } else {
            dobError.style.display = 'none';
        }

        Array.from(genderInputs).forEach(input => input.disabled = !isValid); // Enable the next field if valid
        return isValid;
    }

    function validateGender() {
        const isValid = Array.from(genderInputs).some(input => input.checked);
        genderError.style.display = isValid ? 'none' : 'block';
        emailInput.disabled = !isValid; // Enable the next field if valid
        return isValid;
    }

    function validateEmail() {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@techinnovators\.com$/;
        const isValid = emailPattern.test(emailInput.value.trim());
        emailError.style.display = isValid ? 'none' : 'block';
        phoneInput.disabled = !isValid; // Enable the next field if valid
        return isValid;
    }

    function validatePhone() {
        const phonePattern = /^[0-9]{10}$/; // Exactly 10 digits
        const isValid = phonePattern.test(phoneInput.value.trim());
        phoneError.style.display = isValid ? 'none' : 'block';
        passwordInput.disabled = !isValid; // Enable the next field if valid
        return isValid;
    }

    function validatePassword() {
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const password = passwordInput.value.trim();
        const isValid = passwordPattern.test(password);

        if (password.length >= 8) {
            if (passwordPattern.test(password)) {
                passwordStrength.textContent = 'Strong';
                passwordStrength.style.color = 'green';
            } else if (/(?=.*[A-Za-z])(?=.*\d).{6,}/.test(password)) {
                passwordStrength.textContent = 'Medium';
                passwordStrength.style.color = 'orange';
            } else {
                passwordStrength.textContent = 'Weak';
                passwordStrength.style.color = 'red';
            }
        } else {
            passwordStrength.textContent = 'Weak';
            passwordStrength.style.color = 'red';
        }

        passwordError.style.display = isValid ? 'none' : 'block';
        submitBtn.disabled = !isValid; // Enable the submit button if valid
        return isValid;
    }

    // Real-time validation
    nameInput.addEventListener('input', validateName);
    dobInput.addEventListener('input', validateDOB);
    Array.from(genderInputs).forEach(input => input.addEventListener('change', validateGender));
    emailInput.addEventListener('input', validateEmail);
    phoneInput.addEventListener('input', validatePhone);
    passwordInput.addEventListener('input', validatePassword);

    // Form submission handler
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (
            validateName() &&
            validateDOB() &&
            validateGender() &&
            validateEmail() &&
            validatePhone() &&
            validatePassword()
        ) {
            alert('Form submitted successfully!');
            form.reset();
            passwordStrength.textContent = '';
            dobInput.disabled = true;
            Array.from(genderInputs).forEach(input => input.disabled = true);
            emailInput.disabled = true;
            phoneInput.disabled = true;
            passwordInput.disabled = true;
            submitBtn.disabled = true;
        } else {
            alert('Please fix the errors in the form.');
        }
    });
});
