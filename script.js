document.getElementById('darkModeToggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));

    this.innerText = document.body.classList.contains('dark-mode') ? "Modo Claro" : "Modo Oscuro";
});

if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    document.getElementById('darkModeToggle').innerText = "Modo Claro";
}