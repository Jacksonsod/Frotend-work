document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitBtn = document.getElementById('submit-btn');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');

    // Email validation pattern
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Function to validate name
    function validateName() {
        const namePattern = /^[A-Za-z\s]+$/; // Allows only letters and spaces
        const isValid = namePattern.test(nameInput.value.trim());
        nameError.style.display = isValid ? 'none' : 'block';
        emailInput.disabled = !isValid; // Enable the next field if valid
        return isValid;
    }

    // Function to validate email
    function validateEmail() {
        const isValid = emailPattern.test(emailInput.value.trim());
        emailError.style.display = isValid ? 'none' : 'block';
        messageInput.disabled = !isValid; // Enable the next field if valid
        return isValid;
    }

    // Function to toggle the submit button
    function toggleSubmitButton() {
        const isFormValid = validateName() && validateEmail();
        submitBtn.disabled = !isFormValid;
    }

    // Real-time validation
    nameInput.addEventListener('input', () => {
        validateName();
        toggleSubmitButton();
    });

    emailInput.addEventListener('input', () => {
        validateEmail();
        toggleSubmitButton();
    });

    // Form submission handler
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        if (validateName() && validateEmail()) {
            alert('Message sent successfully!');
            contactForm.reset();
            emailInput.disabled = true;
            messageInput.disabled = true;
            submitBtn.disabled = true;
        } else {
            alert('Please fix the errors in the form.');
        }
    });

    // Initial validation check
    toggleSubmitButton();
});