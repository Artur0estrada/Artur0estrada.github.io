// Animaciones con Intersection Observer
document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // CONTADOR REGRESIVO
    // ========================================
    // ⚠️ IMPORTANTE: Cambia esta fecha por la fecha REAL de tu boda
    // Formato: 'AÑO-MES-DÍATHORA:MINUTOS:00'
    // Ejemplo: '2024-12-25T18:00:00' = 25 de diciembre 2024 a las 6:00 PM
    const fechaBoda = new Date('2026-04-18T17:00:00').getTime();
    
    function actualizarContador() {
        const ahora = new Date().getTime();
        const diferencia = fechaBoda - ahora;
        
        // Calcular días, horas, minutos y segundos
        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);
        
        // Actualizar el DOM
        const diasEl = document.getElementById('dias');
        const horasEl = document.getElementById('horas');
        const minutosEl = document.getElementById('minutos');
        const segundosEl = document.getElementById('segundos');
        
        if (diasEl) diasEl.textContent = dias >= 0 ? dias : 0;
        if (horasEl) horasEl.textContent = horas >= 0 ? horas : 0;
        if (minutosEl) minutosEl.textContent = minutos >= 0 ? minutos : 0;
        if (segundosEl) segundosEl.textContent = segundos >= 0 ? segundos : 0;
        
        // Cuando llegue el día
        if (diferencia < 0) {
            clearInterval(intervaloContador);
            const countdownContainer = document.querySelector('.countdown-container');
            if (countdownContainer) {
                countdownContainer.innerHTML = `
                    <div class="countdown-finalizado">
                        <h3>¡Es hoy!</h3>
                        <p>El día ha llegado 💐</p>
                    </div>
                `;
            }
        }
    }
    
    // Iniciar el contador
    const intervaloContador = setInterval(actualizarContador, 1000);
    actualizarContador(); // Ejecutar inmediatamente

    // ========================================
    // SMOOTH SCROLL
    // ========================================
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

    // ========================================
    // ANIMACIONES AL HACER SCROLL
    // ========================================
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

    // ========================================
    // EFECTO PARALLAX EN EL HERO
    // ========================================
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero && scrolled < window.innerHeight) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
            hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
        }
    });

    // ========================================
    // BOTÓN DE CONFIRMACIÓN
    // ========================================
    const btnConfirmar = document.querySelector('.btn-confirmar');
    if (btnConfirmar) {
        btnConfirmar.addEventListener('click', function(e) {
            // Aquí puedes agregar la lógica para manejar la confirmación
            // Por ejemplo, redirigir a un formulario de Google Forms o similar
            // e.preventDefault();
            // alert('Funcionalidad de confirmación - agregar tu enlace aquí');
        });
    }

    // ========================================
    // ANIMACIÓN DE ORNAMENTOS FLOTANTES
    // ========================================
    const ornamentos = document.querySelectorAll('.ornamento-flotante');
    ornamentos.forEach((ornamento, index) => {
        setTimeout(() => {
            ornamento.style.opacity = '0.08';
        }, 1000 + (index * 500));
    });

    // ========================================
    // EFECTOS HOVER EN EVENTOS (SOLO DESKTOP)
    // ========================================
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

    // ========================================
    // COPIAR DIRECCIÓN AL PORTAPAPELES
    // ========================================
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

    // ========================================
    // OPTIMIZACIÓN DE ENLACES DE MAPAS
    // ========================================
    const userAgent = navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    const isAndroid = /android/.test(userAgent);

    const btnGoogle = document.querySelector('.btn-google');
    const btnApple = document.querySelector('.btn-apple');
    const btnWaze = document.querySelector('.btn-waze');

    if (isIOS && btnApple) {
        // En iOS, dar prioridad a Apple Maps
        btnApple.style.order = '-1';
    } else if (btnApple) {
        // En otros dispositivos, ocultar Apple Maps o dejarlo al final
        btnApple.style.opacity = '0.7';
    }

    // ========================================
    // BOTÓN COMPARTIR UBICACIÓN
    // ========================================
    const compartirUbicacion = document.createElement('button');
    compartirUbicacion.className = 'btn-mapa btn-compartir';
    compartirUbicacion.innerHTML = '📤 Compartir Ubicación';
    compartirUbicacion.style.background = 'var(--color-sage)';
    compartirUbicacion.style.border = 'none';
    compartirUbicacion.style.cursor = 'pointer';

    compartirUbicacion.addEventListener('click', async () => {
        const textoCompartir = 'Hacienda Quinta Napoles - Heroica Ciudad de Ures, Sonora, México';
        const urlMapa = btnGoogle ? btnGoogle.href : '';

        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Ubicación de la Boda',
                    text: textoCompartir,
                    url: urlMapa
                });
            } catch (err) {
                console.log('Error al compartir:', err);
            }
        } else {
            // Fallback: copiar al portapapeles
            navigator.clipboard.writeText(`${textoCompartir}\n${urlMapa}`);
            compartirUbicacion.innerHTML = '✓ Ubicación Copiada';
            setTimeout(() => {
                compartirUbicacion.innerHTML = '📤 Compartir Ubicación';
            }, 2000);
        }
    });

    const mapaBotones = document.querySelector('.mapa-botones');
    if (mapaBotones) {
        mapaBotones.appendChild(compartirUbicacion);
    }

    // ========================================
    // COPIAR NÚMERO DE CUENTA
    // ========================================
    const btnCopiarCuenta = document.getElementById('btnCopiarCuenta');
    const numeroCuenta = document.getElementById('numeroCuenta');
    
    if (btnCopiarCuenta && numeroCuenta) {
        btnCopiarCuenta.addEventListener('click', function() {
            const textoNumero = numeroCuenta.textContent.trim();
            
            navigator.clipboard.writeText(textoNumero).then(() => {
                // Feedback visual
                const textoOriginal = btnCopiarCuenta.textContent;
                btnCopiarCuenta.textContent = '✓ Número Copiado';
                btnCopiarCuenta.style.background = 'linear-gradient(135deg, var(--color-gold), #B8944D)';
                
                setTimeout(() => {
                    btnCopiarCuenta.textContent = textoOriginal;
                    btnCopiarCuenta.style.background = '';
                }, 2500);
            }).catch(err => {
                console.error('Error al copiar:', err);
            });
        });
        
        // También permitir copiar haciendo clic en el número
        numeroCuenta.addEventListener('click', function() {
            const textoNumero = this.textContent.trim();
            
            navigator.clipboard.writeText(textoNumero).then(() => {
                const original = this.textContent;
                this.textContent = '✓ Copiado';
                
                setTimeout(() => {
                    this.textContent = original;
                }, 2000);
            });
        });
    }
});

// ========================================
// LAZY LOADING PARA IMÁGENES
// ========================================
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