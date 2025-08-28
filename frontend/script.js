// ===========================
// Menú de navegación móvil
// ===========================

const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// ===========================
// Cerrar menú al hacer clic en un enlace
// ===========================

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// ===========================
// Desplazamiento suave
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===========================
// Cambiar fondo header al hacer scroll
// ===========================

window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// ===========================
// Animaciones con Intersection Observer
// ===========================

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('fade-in-up');
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.service-card, .portfolio-item, .about-content, .contact-content')
    .forEach(el => observer.observe(el));

// ===========================
// API URL (local o docker)
// ===========================

const API_URL = window.location.hostname === "localhost"
    ? "http://localhost:5000/api/users"
    : "http://backend:5000/api/users";

// ===========================
// Manejo del formulario de registro
// ===========================

const registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = registerForm.username.value.trim();
        const email = registerForm.email.value.trim();
        const password = registerForm.password.value;
        const confirmPassword = registerForm['confirm-password'].value;

        if (!username || !email || !password || !confirmPassword) {
            showNotification('Por favor, completa todos los campos', 'error');
            return;
        }
        if (!isValidEmail(email)) {
            showNotification('Correo electrónico no válido', 'error');
            return;
        }
        if (password.length < 6) {
            showNotification('La contraseña debe tener al menos 6 caracteres', 'error');
            return;
        }
        if (password !== confirmPassword) {
            showNotification('Las contraseñas no coinciden', 'error');
            return;
        }

        try {
            const res = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password })
            });
            const data = await res.json();

            if (res.ok) {
                showNotification(data.message || 'Usuario registrado con éxito', 'success');
                registerForm.reset();
            } else {
                showNotification(data.message || 'Error al registrar usuario', 'error');
            }
        } catch (err) {
            console.error(err);
            showNotification('Error de conexión con el servidor', 'error');
        }
    });
}

// ===========================
// Validación email
// ===========================

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ===========================
// Sistema de notificaciones
// ===========================

function showNotification(message, type = 'info') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    notification.style.cssText = `
        position: fixed;
        top: 20px; right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;

    document.body.appendChild(notification);
    setTimeout(() => notification.style.transform = 'translateX(0)', 100);
    setTimeout(() => removeNotification(notification), 5000);

    notification.querySelector('.notification-close').addEventListener('click', () => removeNotification(notification));
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => notification.remove(), 300);
}

// ===========================
// Perfumes
// ===========================

async function cargarPerfumes() {
    const url = window.location.hostname === "localhost"
        ? "http://localhost:5000/perfumes"  : "http://backend:5000/perfumes";

    try {
        let res = await fetch(url);
        let perfumes = await res.json();

        const container = document.getElementById("resultado");
        if (container) {
            container.innerHTML = "<h3>Perfumes disponibles:</h3>";
            perfumes.forEach(p => {
                container.innerHTML += `<p><strong>${p.nombre}</strong> - ${p.precio}</p>`;
            });
        }
    } catch (err) {
        console.error("Error al consumir la API:", err);
    }
}

document.addEventListener("DOMContentLoaded", cargarPerfumes);
