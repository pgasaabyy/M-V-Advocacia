// MENU MOBILE
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav-link');

if (navToggle) {
    navToggle.addEventListener('click', () => navMenu.classList.add('show'));
}

if (navClose) {
    navClose.addEventListener('click', () => navMenu.classList.remove('show'));
}

navLinks.forEach(link => {
    link.addEventListener('click', () => navMenu.classList.remove('show'));
});

// HEADER SCROLL
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 50 ? '0 2px 10px rgba(0,0,0,0.1)' : 'none';
});

// SCROLL SUAVE
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// LINK ATIVO
const sections = document.querySelectorAll('section[id]');
function highlightActiveLink() {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
}
window.addEventListener('scroll', highlightActiveLink);

// FORMULÁRIO
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        if (!name || !email || !message) {
            showMessage('Preencha todos os campos', 'error');
            return;
        }
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
        
        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            showMessage('Mensagem enviada com sucesso!', 'success');
            contactForm.reset();
            
            setTimeout(() => {
                const msg = encodeURIComponent(`Olá! Meu nome é ${name}. ${message}`);
                window.open(`https://wa.me/5511999999999?text=${msg}`, '_blank');
            }, 2000);
        } catch (error) {
            showMessage('Erro ao enviar. Tente via WhatsApp.', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Enviar Mensagem';
        }
    });
}

function showMessage(msg, type) {
    formMessage.textContent = msg;
    formMessage.className = `form-message ${type}`;
    setTimeout(() => formMessage.style.display = 'none', 5000);
}