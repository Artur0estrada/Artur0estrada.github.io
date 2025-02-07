document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe

    // Simula el envío del formulario
    setTimeout(function() {
        document.getElementById('confirmationMessage').classList.remove('hidden');
        document.getElementById('contactForm').reset();
    }, 1000);
});