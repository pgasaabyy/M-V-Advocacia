// ====== MONTEIRO & VASCONCELOS ADVOCACIA - JAVASCRIPT ======

// ====== MENU MOBILE ======
// Controla abertura e fechamento do menu em dispositivos móveis
const navToggle = document.getElementById("navToggle")
const navClose = document.getElementById("navClose")
const navMenu = document.getElementById("navMenu")

// Abre o menu mobile
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("active")
  })
}

// Fecha o menu mobile
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("active")
  })
}

// Fecha menu ao clicar em um link
const navLinks = document.querySelectorAll(".nav-link")
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
  })
})

// ====== SCROLL SUAVE ======
// Adiciona comportamento suave ao scroll para links âncora
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))

    if (target) {
      const headerOffset = 80
      const elementPosition = target.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  })
})

// ====== HEADER SCROLL ======
// Adiciona sombra ao header quando o usuário faz scroll
const header = document.querySelector(".header")
let lastScroll = 0

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset

  // Adiciona classe quando faz scroll
  if (currentScroll > 100) {
    header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)"
  } else {
    header.style.boxShadow = "none"
  }

  lastScroll = currentScroll
})

// ====== FORMULÁRIO DE CONTATO ======
// Validação e envio do formulário
const contactForm = document.getElementById("contactForm")

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault()

    // Coleta dados do formulário
    const formData = {
      nome: document.getElementById("nome").value,
      email: document.getElementById("email").value,
      telefone: document.getElementById("telefone").value,
      assunto: document.getElementById("assunto").value,
      mensagem: document.getElementById("mensagem").value,
    }

    // Log dos dados (em produção, enviar para servidor)
    console.log("Formulário enviado:", formData)

    // Exibe mensagem de sucesso
    alert("Mensagem enviada com sucesso! Entraremos em contato em breve.")

    // Limpa o formulário
    contactForm.reset()
  })
}

// ====== ANIMAÇÃO DE ENTRADA ======
// Elementos aparecem ao entrar na viewport
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observa cards e seções para animação
const animatedElements = document.querySelectorAll(".service-card, .area-card, .stat-item")
animatedElements.forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(20px)"
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(el)
})

// ====== MÁSCARA DE TELEFONE ======
// Formata número de telefone automaticamente
const phoneInput = document.getElementById("telefone")

if (phoneInput) {
  phoneInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "")

    if (value.length <= 11) {
      value = value.replace(/^(\d{2})(\d)/g, "($1) $2")
      value = value.replace(/(\d)(\d{4})$/, "$1-$2")
    }

    e.target.value = value
  })
}

// ====== ATIVAÇÃO DO LINK ATIVO NO MENU ======
// Destaca link do menu baseado na seção visível
const sections = document.querySelectorAll("section[id]")

function activateMenuLink() {
  const scrollY = window.pageYOffset

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight
    const sectionTop = section.offsetTop - 100
    const sectionId = section.getAttribute("id")
    const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`)

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach((link) => link.classList.remove("active"))
      if (navLink) {
        navLink.classList.add("active")
      }
    }
  })
}

window.addEventListener("scroll", activateMenuLink)
