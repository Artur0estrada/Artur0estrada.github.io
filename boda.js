// Animaciones con Intersection Observer
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Observador para animaciones al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Aplicar animaciones a las secciones
    const eventos = document.querySelectorAll('.evento');
    eventos.forEach((evento, index) => {
        evento.style.opacity = '0';
        evento.style.transform = 'translateY(30px)';
        evento.style.transition = `all 0.6s ease ${index * 0.2}s`;
        observer.observe(evento);
    });

    // Contador regresivo opcional (descomentar y ajustar fecha si lo deseas)
    /*
    const fechaBoda = new Date('2024-06-15T17:00:00').getTime();
    
    function actualizarContador() {
        const ahora = new Date().getTime();
        const diferencia = fechaBoda - ahora;
        
        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);
        
        // Aquí puedes mostrar el contador en algún elemento HTML
        // document.getElementById('contador').innerHTML = `${dias}d ${horas}h ${minutos}m ${segundos}s`;
        
        if (diferencia < 0) {
            clearInterval(intervalo);
            // document.getElementById('contador').innerHTML = "¡Es hoy!";
        }
    }
    
    const intervalo = setInterval(actualizarContador, 1000);
    actualizarContador();
    */

    // Efecto parallax sutil en el hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero && scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
            hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
        }
    });

    // Prevenir envío del formulario si tienes uno
    const btnConfirmar = document.querySelector('.btn-confirmar');
    if (btnConfirmar) {
        btnConfirmar.addEventListener('click', function(e) {
            // Aquí puedes agregar la lógica para manejar la confirmación
            // Por ejemplo, redirigir a un formulario de Google Forms o similar
            // e.preventDefault();
            // alert('Funcionalidad de confirmación - agregar tu enlace aquí');
        });
    }

    // Animación de entrada para los ornamentos
    const ornamentos = document.querySelectorAll('.ornamento-flotante');
    ornamentos.forEach((ornamento, index) => {
        setTimeout(() => {
            ornamento.style.opacity = '0.08';
        }, 1000 + (index * 500));
    });

    // Efecto hover en las tarjetas de eventos (solo desktop)
    if (window.innerWidth > 768) {
        eventos.forEach(evento => {
            evento.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            evento.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // Función para copiar dirección al portapapeles
    const direcciones = document.querySelectorAll('.evento-direccion');
    direcciones.forEach(direccion => {
        direccion.style.cursor = 'pointer';
        direccion.title = 'Click para copiar la dirección';
        
        direccion.addEventListener('click', function() {
            const texto = this.innerText;
            navigator.clipboard.writeText(texto).then(() => {
                // Feedback visual
                const original = this.innerHTML;
                this.innerHTML = '✓ Dirección copiada';
                this.style.color = 'var(--color-sage)';
                
                setTimeout(() => {
                    this.innerHTML = original;
                    this.style.color = '';
                }, 2000);
            });
        });
    });
});

// Lazy loading para imágenes (si agregas imágenes posteriormente)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    const images = document.querySelectorAll('img.lazy');
    images.forEach(img => imageObserver.observe(img));
}

// Función para añadir partículas decorativas (opcional)
function crearParticulas() {
    const container = document.querySelector('.hero');
    if (!container) return;
    
    for (let i = 0; i < 20; i++) {
        const particula = document.createElement('div');
        particula.style.position = 'absolute';
        particula.style.width = Math.random() * 4 + 'px';
        particula.style.height = particula.style.width;
        particula.style.background = 'var(--color-gold)';
        particula.style.borderRadius = '50%';
        particula.style.opacity = Math.random() * 0.3;
        particula.style.left = Math.random() * 100 + '%';
        particula.style.top = Math.random() * 100 + '%';
        particula.style.animation = `float ${Math.random() * 10 + 5}s ease-in-out infinite`;
        particula.style.animationDelay = Math.random() * 5 + 's';
        particula.style.pointerEvents = 'none';
        
        // Descomentar para activar partículas
        // container.appendChild(particula);
    }
}

// Inicializar partículas (opcional - descomentado si lo deseas)
// crearParticulas();