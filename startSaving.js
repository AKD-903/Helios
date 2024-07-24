document.getElementById('appointmentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;

    // Display confirmation message
    const confirmationMessage = `Appointment booked for ${name} on ${date} at ${time}.`;
    document.getElementById('confirmation').innerText = confirmationMessage;

    setTimeout(function() {
        document.getElementById('appointmentForm').reset();
    }, 2000); // 2000 milliseconds = 2 seconds
});
