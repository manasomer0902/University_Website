function validateFeedback() {
    const name = document.getElementById('name').value.trim();
    const feedback = document.getElementById('feedback').value.trim();

    if (!name || !feedback) {
        alert("All fields must be filled out.");
        if (!name) document.getElementById('name').focus();
        else document.getElementById('feedback').focus();
        return false;
    }

    return true; // Allow form to submit
}
