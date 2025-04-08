// Student Registration Form Validation
function validateRegistrationForm() {
    const name = document.getElementById('name').value.trim();
    const programme = document.getElementById('programme').value.trim();
    const serial = document.getElementById('serial').value.trim();

    if (!name || !programme || !serial) {
        alert("All fields must be filled out.");
        return false;
    }
    
    alert("Form submitted successfully!");
    return true;
}


