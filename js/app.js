
console.log("AUTODX JS carregou 🚗");


// =========================
// HELPERS
// =========================
const $ = (el) => document.querySelector(el);
const $$ = (el) => document.querySelectorAll(el);


// =========================
// LOGIN SYSTEM
// =========================
const loginForm = document.getElementById("loginForm");
const contatoForm = document.querySelector(".form-contato");

if (loginForm) {

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = $("#username").value.trim();
        const password = $("#password").value;
        const errorMsg = $("#errorMsg");

        // login simples 
        const userCorreto = "admin";
        const senhaCorreta = "1234";

        if (username === userCorreto && password === senhaCorreta) {

            localStorage.setItem("autodx_user", username);

            errorMsg.style.color = "lime";
            errorMsg.textContent = "Login realizado 🚗";

            atualizarAuthUI();

            setTimeout(() => {
                window.location.href = "perfil.html";
            }, 700);

        } else {
            errorMsg.style.color = "red";
            errorMsg.textContent = "Usuário ou senha incorretos!";
        }

    });

}

if (contatoForm) {

    contatoForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const botao = contatoForm.querySelector("button");
        const textoOriginal = botao.textContent;

        botao.textContent = "MENSAGEM ENVIADA";
        contatoForm.reset();

        setTimeout(() => {
            botao.textContent = textoOriginal;
        }, 2200);
    });

}


// =========================
// AUTH SYSTEM (MENU + PERFIL)
// =========================
function atualizarAuthUI() {

    const user = localStorage.getItem("autodx_user");
    const authLink = $("#authLink");

    if (!authLink) return;

    if (user) {
        authLink.innerHTML = `
            <a href="perfil.html" class="btn-login">Meu Perfil</a>
        `;
    } else {
        authLink.innerHTML = `
            <a href="login.html" class="btn-login">Login</a>
        `;
    }

}

atualizarAuthUI();


// =========================
// LOGOUT SYSTEM (NOVO)
// =========================
function logout() {
    localStorage.removeItem("autodx_user");
    window.location.href = "login.html";
}


// =========================
// CARD HOVER EFFECT
// =========================
const cards = $$(".card-carro");

cards.forEach(card => {

    card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-10px) scale(1.02)";
        card.style.boxShadow = "0 0 25px rgba(168,85,247,0.35), 0 0 60px rgba(168,85,247,0.15)";
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "translateY(0) scale(1)";
        card.style.boxShadow = "none";
    });

});


// =========================
// HEADER SCROLL EFFECT
// =========================
const header = $("header");

if (header) {

    window.addEventListener("scroll", () => {

        const scrolled = window.scrollY > 50;

        header.style.background = scrolled
            ? "rgba(5, 5, 15, 0.75)"
            : "rgba(10, 10, 20, 0.45)";

        header.style.backdropFilter = scrolled
            ? "blur(18px)"
            : "blur(14px)";

    });

}


// =========================
// SCROLL REVEAL
// =========================
const revealElements = $$(".card-home, .card-carro, .card-sobre, .card-contato, .login-container");

const observer = new IntersectionObserver((entries, obs) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            obs.unobserve(entry.target);
        }

    });

}, {
    threshold: 0.15
});

revealElements.forEach(el => {
    el.classList.add("hidden");
    observer.observe(el);
});


// =========================
// TYPING EFFECT
// =========================
const titulo = $(".digitando");

if (titulo) {

    const texto = titulo.textContent;
    titulo.textContent = "";

    let i = 0;

    const escrever = () => {

        if (i < texto.length) {
            titulo.textContent += texto[i];
            i++;
            setTimeout(escrever, 55);
        }

    };

    escrever();

}


// =========================
// PARTICLES
// =========================
function criarParticula() {

    const p = document.createElement("span");
    p.classList.add("particula");

    const size = Math.random() * 6 + 2;

    p.style.width = size + "px";
    p.style.height = size + "px";
    p.style.left = Math.random() * window.innerWidth + "px";
    p.style.animationDuration = (Math.random() * 3 + 2) + "s";

    document.body.appendChild(p);

    setTimeout(() => p.remove(), 5000);

}

setInterval(criarParticula, 250);


// =========================
// BUTTON SOUND
// =========================
const buttons = $$("button");

buttons.forEach(btn => {

    btn.addEventListener("mouseenter", () => {

        const hoverSound = new Audio("hover.mp3");
        hoverSound.volume = 0.2;
        hoverSound.play().catch(() => {});

    });

});
