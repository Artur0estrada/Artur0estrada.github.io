document.getElementById('ModoOscuro').addEventListener('click', function() {
    document.body.classList.toggle('cambiar');
    
    localStorage.setItem('modo', document.body.classList.contains('cambiar'));

    this.innerText = document.body.classList.contains('cambiar') ? "Modo Claro" : "Modo Oscuro";
});

if (localStorage.getItem('modo') === 'true') {
    document.body.classList.add('cambiar');
    document.getElementById('ModoOscuro').innerText = "Modo Claro";
}